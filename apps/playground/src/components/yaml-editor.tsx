import {useForwardedRef} from '@cosmonic/orbit-ui';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import {configureMonacoYaml} from 'monaco-yaml';
import * as React from 'react';
import YamlWorker from './yaml.worker.js?worker';

const monacoOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  language: 'yaml',
  automaticLayout: true,
  minimap: {enabled: false},
  scrollbar: {alwaysConsumeMouseWheel: false},
  fixedOverflowWidgets: true,
};

// eslint-disable-next-line no-restricted-globals -- MonacoEnvironment is a global variable
self.MonacoEnvironment = {
  getWorker(moduleId: string, label: string) {
    if (label === 'yaml') {
      return new YamlWorker();
    }

    return new EditorWorker();
  },
};

configureMonacoYaml(monaco, {
  enableSchemaRequest: true,
  hover: true,
  completion: true,
  validate: true,
  format: true,
  schemas: [
    {
      uri: 'https://raw.githubusercontent.com/wasmCloud/wadm/main/oam/oam.schema.json',
      fileMatch: ['*'],
    },
  ],
});

type YamlEditorProps = {
  readonly name?: string;
  readonly value?: string;
  readonly defaultValue?: string;
  readonly onChange?: (value: string) => void;
  readonly disabled?: boolean;
};

const YamlEditor = React.forwardRef<HTMLDivElement, YamlEditorProps>(
  ({defaultValue, onChange, disabled = false, value, name}, passedRef): React.ReactElement => {
    const elementRef = useForwardedRef(passedRef);
    // eslint-disable-next-line @typescript-eslint/ban-types -- React expects null
    const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    // create/dispose of editor
    React.useEffect(() => {
      if (!elementRef?.current) return;

      const model = monaco.editor.createModel('', 'yaml');
      editorRef.current = monaco.editor.create(elementRef.current, {
        ...monacoOptions,
        model,
      });

      return () => {
        const currentEditor = editorRef.current;
        if (currentEditor) {
          editorRef.current = null;
          currentEditor.dispose();
        }
      };
    }, [elementRef]);

    // handle disabled
    React.useEffect(() => {
      if (!editorRef.current) return;
      editorRef.current.updateOptions({readOnly: disabled});
    }, [disabled]);

    // handle default value
    React.useEffect(() => {
      if (!editorRef.current || !defaultValue) return;
      const model = editorRef.current.getModel();
      if (!model) return;
      editorRef.current.setValue(defaultValue);
    }, [defaultValue]);

    // handle value
    React.useEffect(() => {
      if (!editorRef.current || !value) return;
      const model = editorRef.current.getModel();
      if (!model) return;
      if (model.getValue() === value) return;
      editorRef.current.setValue(value);
    }, [value]);

    // attach/update change handler
    React.useEffect(() => {
      const currentEditor = editorRef.current;
      if (!currentEditor) return;

      const listener = currentEditor.onDidChangeModelContent(() => {
        const value = currentEditor.getValue();
        if (onChange) {
          onChange(value);
        }
      });

      return () => {
        listener.dispose();
      };
    }, [onChange]);

    return (
      <div
        ref={elementRef}
        data-name={name}
        data-test-id="editor"
        data-enable-grammarly="false"
        className="h-full min-h-40"
      />
    );
  },
);
YamlEditor.displayName = 'YamlEditor';

export {YamlEditor};

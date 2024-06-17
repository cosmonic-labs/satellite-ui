import {extractApplicationData} from './extract-application-data';

describe('extractApplicationData', () => {
  it('should throw if yaml is empty', () => {
    expect(() => extractApplicationData('')).toThrow();
  });

  it('should throw if yaml is invalid', () => {
    expect(() =>
      extractApplicationData(`
thing: 'stuff'
a
b: 'c'
        `),
    ).toThrow();
  });

  it('should return application data', () => {
    expect(
      extractApplicationData(/* yaml */ `
apiVersion: 'wasmcloud.com/v1alpha1'
kind: Application
metadata:
  name: example
  annotations:
    version: '1.0.0'
    description: 'Test description'
spec:
  components:
  - name: 'actor-1'
    type: 'actor'
    properties:
      image: 'actor-1'
    traits:
      - type: spreadscaler
        properties:
          replicas: 1
          spread:
            - name: 'actor-1-spread'
              requirements:
                app: example
      - type: 'linkdef'
        properties:
          target: 'capability-1'
          values:
            example: 'test'
  - name: 'capability-1'
    type: 'capability'
    properties:
      image: 'capability-1'
      contract: 'wasmcloud:httpserver'
    traits:
      - type: spreadscaler
        properties:
          replicas: 1
          spread:
            - name: 'capability-1-spread'
              requirements:
                app: example
        `),
    ).toEqual({
      name: 'example',
      version: '1.0.0',
      description: 'Test description',
      actors: ['actor-1'],
      providers: ['capability-1'],
      links: ['actor-1:capability-1'],
    });
  });
});

import {cva} from 'class-variance-authority';
import {matchPath, NavLink, useLocation} from 'react-router-dom';
import Icon from 'components/Shared/Icon/Icon';
import {cn} from '@/util/cn.js';

type Breadcrumb = {
  name: string;
  path: string;
  children?: Breadcrumb[];
  disableLink?: boolean;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

const linkStyles = cva(
  'mr-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200',
  {
    variants: {
      isDisabled: {
        true: 'hover:text-gray-500 dark:hover:text-slate-400',
      },
      isActive: {
        true: '',
      },
      isPending: {
        true: '',
      },
    },
  },
);

export default function Breadcrumbs({items}: BreadcrumbsProps): JSX.Element {
  const {pathname} = useLocation();

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isExact = !Object.is(matchPath(pathname, item.path), null);
          const isDisabled = item.disableLink || isExact;
          return (
            <li key={item.name}>
              <div className="flex items-center">
                {index !== 0 && (
                  <Icon
                    iconName="fa-solid fa-chevron-right"
                    className="mr-2 h-3.5 w-3.5 shrink-0 text-sm text-slate-400 dark:text-slate-600"
                    aria-hidden="true"
                  />
                )}
                {item.children ? null : isDisabled ? (
                  <span className={cn(linkStyles({isDisabled}))}>{item.name}</span>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({isActive}) => cn(linkStyles({isActive, isDisabled}))}
                    aria-current={isExact ? 'page' : undefined}
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

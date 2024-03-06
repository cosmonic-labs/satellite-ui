import {useNavigate} from 'react-router-dom';
import LogoSVG from 'assets/images/cosmonic-white.svg?react';
import {Dropdown, DropdownList, DropdownListItem} from 'components/Shared/Dropdown/Dropdown';
import Icon from 'components/Shared/Icon/Icon';
import {WithTooltip} from 'components/Shared/WithTooltip/WithTooltip';
import {useUser} from 'features/authentication/hooks/useUser';
import {ConstellationPicker} from 'features/constellation';
import {useFeatureFlag} from 'features/experiments/hooks';
import UIVersion from 'features/misc/components/UIVersion';

function NavControls(): JSX.Element {
  const navigate = useNavigate();
  const {logout, user} = useUser();
  const debugEnabled = useFeatureFlag('DebugInformation');

  return (
    <div className="relative z-40 mr-4 flex items-center space-x-8">
      <WithTooltip tooltipText="Docs">
        <Icon
          iconName="icon-more-info"
          className="text-white"
          onClick={() =>
            window.open('https://cosmonic.com/docs/welcome', '_blank', 'noopener,noreferrer')
          }
        />
      </WithTooltip>
      <Dropdown
        showOnHover={false}
        dropdownSelect={
          <div className="relative ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-spaceBlue text-center font-semibold uppercase text-white">
            {user?.profilePictureUrl ? (
              <img
                className="h-full w-full cursor-pointer rounded-full"
                src={user.profilePictureUrl}
                alt="User Profile"
              />
            ) : (
              <Icon iconName="fa-duotone fa-user-astronaut" className="text-xl text-gainsboro" />
            )}
          </div>
        }
      >
        <DropdownList className="right-2">
          <DropdownListItem
            item={<div className="text-spaceBlue">Account</div>}
            onClick={() => {
              navigate('/account');
            }}
          />
          <DropdownListItem item={<div className="text-spaceBlue">Logout</div>} onClick={logout} />
          {debugEnabled && (
            <DropdownListItem
              item={
                <div className="text-xs text-spaceBlue">
                  Version: <UIVersion />
                </div>
              }
              onClick={() => null}
            />
          )}
        </DropdownList>
      </Dropdown>
    </div>
  );
}

export default function PrimaryNav(): JSX.Element {
  return (
    <nav className="relative z-40 flex items-center justify-between bg-slatePurple-light py-2.5 dark:bg-slatePurple-dark">
      <LogoSVG className="mx-4" height="24px" width="24px" />
      <div className="mr-auto">
        <ConstellationPicker />
      </div>
      <NavControls />
    </nav>
  );
}

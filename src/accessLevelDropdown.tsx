import React from 'react';
import { accessLevels } from './constants';

const AccessLevelDropdown = () => {
    const [showAccessDropdown, toggleAccessDropdown] = React.useState(false);
    const [accessLevel, setAccessLevel] = React.useState(accessLevels[0]);
    const menuClass = `dropdown-menu${showAccessDropdown ? " show" : ""}`;

    return (
        <div className='dropdown' onClick={() => toggleAccessDropdown(!showAccessDropdown)}>
            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {accessLevel}
            </button>
            <div className={menuClass} aria-labelledby="dropdownMenuButton">
                {accessLevels.map((accessLevel: string, index: number) => <a className="dropdown-item" href="#" key={index} onClick={() => setAccessLevel(accessLevel)}>{accessLevel}</a>)}
            </div>
        </div>
    )
}

export default AccessLevelDropdown;
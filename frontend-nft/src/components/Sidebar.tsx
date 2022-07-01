import React, { useState } from 'react';
import SidebarOption from './SidebarOption';
import ContentLibrary from './ContentLibrary';

function Sidebar() {
  let [contentEnabled, setContentEnabled] = useState();
  return (
    <div>
      <SidebarOption />
      <SidebarOption />
      {contentEnabled ? <ContentLibrary /> : null}
    </div>
  );
}

export default Sidebar;

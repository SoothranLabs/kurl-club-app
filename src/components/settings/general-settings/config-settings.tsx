import React from 'react';
import SetBuffer from './setBuffer';
import AutomatedMessages from './automated-messages';

function ConfigSettings() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <SetBuffer />
      <AutomatedMessages />
    </div>
  );
}

export default ConfigSettings;

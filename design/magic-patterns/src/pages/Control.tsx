import { useState } from 'react';
import { ControlHero } from '../components/control/ControlHero';
import { ExecutionGap } from '../components/control/ExecutionGap';
import { ControlCapabilities } from '../components/control/ControlCapabilities';
import { ControlConsole, type ConsoleTab } from '../components/console/ControlConsole';
import { Lifecycle } from '../components/control/Lifecycle';
import { ControlLimits } from '../components/control/ControlLimits';
import { ClosingCta } from '../components/ClosingCta';

export function Control() {
  const [tab, setTab] = useState<ConsoleTab>('inventory');

  const openTab = (t: ConsoleTab) => {
    setTab(t);
    document.getElementById('console')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <ControlHero />
      <ExecutionGap />
      <ControlCapabilities onOpen={openTab} />
      <ControlConsole tab={tab} onTab={setTab} />
      <Lifecycle />
      <ControlLimits />
      <ClosingCta
        title="Running agents against production systems?"
        lead="We are working through the verification model with a small number of teams. If your agents touch payments, records, infrastructure or customers, we would like to hear what breaks."
        primary={{ label: 'Apply to be a design partner', to: '/contact?type=control' }}
      />
    </>
  );
}

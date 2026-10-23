"use client";

import { useState } from "react";
import type { ConsoleTab } from "@/lib/arc/control";
import { ControlCapabilities } from "@/components/arc/control/capabilities";
import { ControlConsole } from "@/components/arc/console/control-console";

/**
 * The capability list and the console share one piece of state: clicking
 * "See it in Audit evidence" opens that console view and scrolls to it. That
 * is the only reason this part of the page is a client component.
 */
export function ControlInteractive() {
  const [tab, setTab] = useState<ConsoleTab>("inventory");

  const openTab = (t: ConsoleTab) => {
    setTab(t);
    document.getElementById("console")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <ControlCapabilities onOpen={openTab} />
      <ControlConsole tab={tab} onTab={setTab} />
    </>
  );
}

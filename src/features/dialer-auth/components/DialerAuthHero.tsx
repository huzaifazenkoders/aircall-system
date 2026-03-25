import {
  Clock3,
  Headphones,
  Hexagon,
  Home,
  Phone,
  Video,
} from "lucide-react";

import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const previewRows = [
  ["VIP Ticket", "$197", "06/12/26"],
  ["VIP Ticket", "$197", "06/12/26"],
  ["VIP Ticket", "$197", "06/12/26"],
  ["VIP Ticket", "$197", "06/12/26"],
  ["VIP Ticket", "$197", "06/12/26"],
];

const timelineItems = [
  "No Answer",
  "No Answer",
  "No Answer",
  "Voice Mail",
];

const DialerAuthHero = () => {
  return (
    <div className={dialerAuthStyles.heroPanel}>
      <div className={dialerAuthStyles.heroInner}>
        <div className={dialerAuthStyles.brandRow}>
          <div className={dialerAuthStyles.brandBadge}>
            <Hexagon className="size-4 fill-current stroke-[0]" aria-hidden="true" />
          </div>
          <span className={dialerAuthStyles.brandText}>Aircall System</span>
        </div>

        <div className={dialerAuthStyles.heroCopy}>
          <h1 className={dialerAuthStyles.heroTitle}>
            Where Lead Routing Meets Smart Calling
          </h1>
          <p className={dialerAuthStyles.heroSubtitle}>
            Centralize outbound calling, manage priority lists, and optimize
            lead distribution all in one streamlined platform built for
            high-performance sales teams.
          </p>
        </div>

        <div className={dialerAuthStyles.heroPreviewWrap}>
          <div className={dialerAuthStyles.heroPreviewShell}>
            <div className={dialerAuthStyles.heroPreviewCard}>
              <div className={dialerAuthStyles.heroSidebar}>
                <div className={dialerAuthStyles.heroSidebarTop}>
                  <div className={dialerAuthStyles.heroSidebarLogo}>
                    <Hexagon
                      className="size-4 fill-current stroke-[0]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className={dialerAuthStyles.heroSidebarNav}>
                    <div className={dialerAuthStyles.heroSidebarItem}>
                      <Home className="size-4" aria-hidden="true" />
                      <span className={dialerAuthStyles.heroSidebarItemLabel}>
                        Home
                      </span>
                    </div>

                    <div className={dialerAuthStyles.heroSidebarItem}>
                      <Clock3 className="size-4" aria-hidden="true" />
                      <span className={dialerAuthStyles.heroSidebarItemLabel}>
                        History
                      </span>
                    </div>
                  </div>
                </div>

                <div />
              </div>

              <div className={dialerAuthStyles.heroMain}>
                <div className={dialerAuthStyles.heroToolbar}>
                  <div className={dialerAuthStyles.heroToolbarUser}>
                    <div className={dialerAuthStyles.heroToolbarAvatar}>
                      <Phone className="size-4" aria-hidden="true" />
                    </div>

                    <div className={dialerAuthStyles.heroToolbarMeta}>
                      <span className={dialerAuthStyles.heroToolbarName}>
                        Sarah Mitchell
                      </span>
                      <span className={dialerAuthStyles.heroToolbarPhone}>
                        +61 4 12 778 992
                      </span>
                    </div>
                  </div>

                  <div className={dialerAuthStyles.heroToolbarActions}>
                    <div className={dialerAuthStyles.heroToolbarAction}>
                      <Video className="size-4" aria-hidden="true" />
                    </div>
                    <div className={dialerAuthStyles.heroToolbarAction}>
                      <Headphones className="size-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className={dialerAuthStyles.heroContent}>
                  <div className={dialerAuthStyles.heroStack}>
                    <div className={dialerAuthStyles.heroCard}>
                      <div className={dialerAuthStyles.heroCardPad}>
                        <div className="flex items-center justify-between gap-4">
                          <span className={dialerAuthStyles.heroSectionTitle}>
                            BASIC INFORMATION
                          </span>
                          <span className={dialerAuthStyles.heroLabel}>
                            Click to Open Contact in Keap
                          </span>
                        </div>

                        <div className={dialerAuthStyles.heroInfoGrid}>
                          <div className={dialerAuthStyles.heroInfoBlock}>
                            <span className={dialerAuthStyles.heroLabel}>Email</span>
                            <span className={dialerAuthStyles.heroValue}>
                              sarah@gmail.com
                            </span>
                          </div>
                          <div className={dialerAuthStyles.heroInfoBlock}>
                            <span className={dialerAuthStyles.heroLabel}>Phone</span>
                            <span className={dialerAuthStyles.heroValue}>
                              +61 412 778 992
                            </span>
                          </div>
                          <div className={dialerAuthStyles.heroInfoBlock}>
                            <span className={dialerAuthStyles.heroLabel}>
                              Lead Status
                            </span>
                            <span className={dialerAuthStyles.heroValue}>
                              Current Status
                            </span>
                          </div>
                          <div className={dialerAuthStyles.heroInfoBlock}>
                            <span className={dialerAuthStyles.heroLabel}>First Name</span>
                            <span className={dialerAuthStyles.heroValue}>Sarah</span>
                          </div>
                          <div className={dialerAuthStyles.heroInfoBlock}>
                            <span className={dialerAuthStyles.heroLabel}>Event Date</span>
                            <span className={dialerAuthStyles.heroValue}>
                              March 15, 2025
                            </span>
                          </div>
                          <div className={dialerAuthStyles.heroInfoBlock}>
                            <span className={dialerAuthStyles.heroLabel}>Timezone</span>
                            <span className={dialerAuthStyles.heroValue}>
                              Australia/Sydney
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={dialerAuthStyles.heroCard}>
                      <div className={dialerAuthStyles.heroCardPad}>
                        <div className="flex items-center justify-between gap-4">
                          <span className={dialerAuthStyles.heroSectionTitle}>
                            Purchase History
                          </span>
                          <span className={dialerAuthStyles.heroStatValue}>
                            $ 2,300
                          </span>
                        </div>

                        <div className={dialerAuthStyles.heroTable}>
                          <div className={dialerAuthStyles.heroTableHead}>
                            <span>Product</span>
                            <span>Amount</span>
                            <span>Purchase Date</span>
                          </div>

                          {previewRows.map((row, index) => (
                            <div
                              key={`${row[0]}-${index}`}
                              className={dialerAuthStyles.heroTableRow}
                            >
                              <span>{row[0]}</span>
                              <span>{row[1]}</span>
                              <span>{row[2]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={dialerAuthStyles.heroCard}>
                    <div className={dialerAuthStyles.heroCardPad}>
                      <span className={dialerAuthStyles.heroSectionTitle}>
                        CALL HISTORY TIMELINE
                      </span>

                      <div className="mt-4">
                        <div className={dialerAuthStyles.heroTimeline}>
                          {timelineItems.map((item, index) => (
                            <div
                              key={`${item}-${index}`}
                              className={dialerAuthStyles.heroTimelineItem}
                            >
                              <div className={dialerAuthStyles.heroTimelineDot}>
                                <Phone className="size-3" aria-hidden="true" />
                              </div>

                              <div className={dialerAuthStyles.heroTimelineCopy}>
                                <span className={dialerAuthStyles.heroTimelineTitle}>
                                  {item}
                                </span>
                                <span className={dialerAuthStyles.heroTimelineText}>
                                  Olivia Smith on Feb 20, 2025
                                </span>
                                <span className={dialerAuthStyles.heroTimelineSubtle}>
                                  Australia/Sydney
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialerAuthHero;

import React from "react";
import { Headset, History, Home, Phone, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import { authStyles } from "@/features/auth/styles/authStyles";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={authStyles.authLayoutRoot}>
      <div className={authStyles.heroPanel}>
        <div className={authStyles.heroTop}>
          <div className={authStyles.brandRow}>
            <div className={authStyles.brandBadge}>
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M11.1 1.5a1.8 1.8 0 0 1 1.8 0l7.4 4.25A1.8 1.8 0 0 1 21.2 7.3v8.4a1.8 1.8 0 0 1-.9 1.55l-7.4 4.25a1.8 1.8 0 0 1-1.8 0l-7.4-4.25a1.8 1.8 0 0 1-.9-1.55V7.3a1.8 1.8 0 0 1 .9-1.55l7.4-4.25Z"
                />
              </svg>
            </div>
            <span className={authStyles.brandText}>Aircall System</span>
          </div>

          <div className={authStyles.heroCopy}>
            <h1 className={authStyles.heroTitle}>
              Where Lead Routing Meets Smart Calling
            </h1>
            <p className={authStyles.heroSubtitle}>
              Centralize outbound calling, manage priority lists, and optimize
              lead distribution all in one streamlined platform built for
              high-performance sales teams.
            </p>
          </div>
        </div>

        <div className={authStyles.heroPreviewWrap}>
          <div className={authStyles.heroPreviewFrame}>
            <div className={authStyles.heroPreviewCard}>
              <aside className={authStyles.heroPreviewSidebar}>
                <div className={authStyles.heroPreviewSidebarTop}>
                  <div className={authStyles.heroPreviewSidebarLogo}>
                    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M11.1 1.5a1.8 1.8 0 0 1 1.8 0l7.4 4.25A1.8 1.8 0 0 1 21.2 7.3v8.4a1.8 1.8 0 0 1-.9 1.55l-7.4 4.25a1.8 1.8 0 0 1-1.8 0l-7.4-4.25a1.8 1.8 0 0 1-.9-1.55V7.3a1.8 1.8 0 0 1 .9-1.55l7.4-4.25Z"
                      />
                    </svg>
                  </div>

                  <div className={authStyles.heroPreviewNav}>
                    <div className={authStyles.heroPreviewNavItem}>
                      <Home className="size-4" aria-hidden="true" />
                      <span>Home</span>
                    </div>
                    <div className={authStyles.heroPreviewNavItem}>
                      <History className="size-4" aria-hidden="true" />
                      <span>History</span>
                    </div>
                  </div>
                </div>
              </aside>

              <div className={authStyles.heroPreviewMain}>
                <div className={authStyles.heroPreviewToolbar}>
                  <div className={authStyles.heroPreviewCaller}>
                    <div className={authStyles.heroPreviewCallerBadge}>
                      <Phone className="size-4" aria-hidden="true" />
                    </div>
                    <div className={authStyles.heroPreviewMeta}>
                      <p className={authStyles.heroPreviewMetaTitle}>
                        Sarah Mitchell
                      </p>
                      <p className={authStyles.heroPreviewMetaText}>
                        +61 412 778 992
                      </p>
                    </div>
                  </div>

                  <div className={authStyles.heroPreviewActions}>
                    <div className={authStyles.heroPreviewActionCircle}>
                      <Video className="size-4" aria-hidden="true" />
                    </div>
                    <div className={authStyles.heroPreviewActionCircle}>
                      <Headset className="size-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className={authStyles.heroPreviewContent}>
                  <div className={authStyles.heroPreviewBottomGrid}>
                    <section className={authStyles.heroPreviewSection}>
                      <p className={authStyles.heroPreviewSectionTitle}>
                        BASIC INFORMATION
                      </p>
                      <div className={authStyles.heroPreviewInfoGrid}>
                        <div className={authStyles.heroPreviewInfoBlock}>
                          <span className={authStyles.heroPreviewLabel}>
                            Email
                          </span>
                          <span className={authStyles.heroPreviewValue}>
                            sarah@gmail.com
                          </span>
                        </div>
                        <div className={authStyles.heroPreviewInfoBlock}>
                          <span className={authStyles.heroPreviewLabel}>
                            Phone
                          </span>
                          <span className={authStyles.heroPreviewValue}>
                            +61 412 778 992
                          </span>
                        </div>
                        <div className={authStyles.heroPreviewInfoBlock}>
                          <span className={authStyles.heroPreviewLabel}>
                            Lead Status
                          </span>
                          <span className={authStyles.heroPreviewValue}>
                            Cooldown
                          </span>
                        </div>
                        <div className={authStyles.heroPreviewInfoBlock}>
                          <span className={authStyles.heroPreviewLabel}>
                            Event Date
                          </span>
                          <span className={authStyles.heroPreviewValue}>
                            March 15, 2025
                          </span>
                        </div>
                        <div className={authStyles.heroPreviewInfoBlock}>
                          <span className={authStyles.heroPreviewLabel}>
                            Timezone
                          </span>
                          <span className={authStyles.heroPreviewValue}>
                            Australia/Sydney
                          </span>
                        </div>
                        <div className={authStyles.heroPreviewInfoBlock}>
                          <span className={authStyles.heroPreviewLabel}>
                            Referred By
                          </span>
                          <span className={authStyles.heroPreviewValue}>
                            Michael Stevens
                          </span>
                        </div>
                      </div>
                    </section>

                    <section className={authStyles.heroPreviewSection}>
                      <p className={authStyles.heroPreviewSectionTitle}>
                        PURCHASE HISTORY
                      </p>
                      <div className={authStyles.heroPreviewTable}>
                        <div className={authStyles.heroPreviewTableHead}>
                          <span>Product</span>
                          <span>Amount</span>
                          <span>Purchase Date</span>
                        </div>
                        {[
                          ["VIP Ticket", "$997", "06/12/26"],
                          ["VIP Ticket", "$997", "06/12/26"],
                          ["VIP Ticket", "$997", "06/12/26"],
                          ["VIP Ticket", "$997", "06/12/26"],
                          ["VIP Ticket", "$997", "06/12/26"]
                        ].map(([product, amount, date], index) => (
                          <div
                            key={`${product}-${date}-${index}`}
                            className={authStyles.heroPreviewTableRow}
                          >
                            <span>{product}</span>
                            <span>{amount}</span>
                            <span>{date}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <section className={authStyles.heroPreviewSection}>
                    <p className={authStyles.heroPreviewSectionTitle}>
                      CALL HISTORY TIMELINE
                    </p>
                    <div className={cn(authStyles.heroPreviewTimeline, "mt-4")}>
                      {["No Answer", "No Answer", "No Answer", "Voice Mail"].map(
                        (item, index) => (
                          <div
                            key={`${item}-${index}`}
                            className={authStyles.heroPreviewTimelineItem}
                          >
                            <div className={authStyles.heroPreviewTimelineDot}>
                              <span className="text-xs">{index + 1}</span>
                            </div>
                            <div className={authStyles.heroPreviewTimelineCopy}>
                              <p className={authStyles.heroPreviewTimelineTitle}>
                                {item}
                              </p>
                              <p className={authStyles.heroPreviewTimelineText}>
                                Olivia Smith on Feb 20, 2025
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={authStyles.authContentPanel}>{children}</div>
    </div>
  );
};

export default AuthLayout;

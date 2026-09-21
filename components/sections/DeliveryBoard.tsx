/**
 * A mandate in flight. `stage` is a zero-based index into `stages` — the
 * furthest stage this kind of engagement has reached.
 */
type DeliveryMandate = {
  role: string;
  industry: string;
  stage: number;
};

type DeliveryBoardProps = {
  /** The delivery stages, in order. Drawn as the rail beneath every mandate. */
  stages: string[];
  mandates: DeliveryMandate[];
};

/**
 * The industries board.
 *
 * Replaces a flat list of industry pills with the same information in motion:
 * which industries we staff, the roles we are asked for, and how far a typical
 * mandate has moved through delivery. The engagements are representative of
 * the work rather than a live feed of client vacancies, and the panel says so.
 */
export function DeliveryBoard({ stages, mandates }: DeliveryBoardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line px-6 py-5">
        <h3 className="text-card text-ink">How a mandate moves</h3>
        <p className="text-sm text-subtle">
          Representative engagements &middot; not a live vacancy feed
        </p>
      </div>

      <ol className="divide-y divide-line">
        {mandates.map((mandate) => (
          <li
            key={mandate.industry}
            className="gap-x-8 px-6 py-5 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:items-center"
          >
            <div>
              <p className="font-medium text-ink">{mandate.role}</p>
              <p className="mt-0.5 text-sm text-subtle">{mandate.industry}</p>
            </div>

            <div className="mt-3 sm:mt-0">
              {/*
               * The rail repeats what the stage label below already states, so
               * it is hidden from assistive tech rather than read out twice.
               */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {stages.map((stage, stageIndex) => (
                  <span
                    key={stage}
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
                  >
                    {stageIndex <= mandate.stage && (
                      <span className="board-rail block h-full rounded-full bg-accent" />
                    )}
                  </span>
                ))}
              </div>

              <p className="mt-2.5 text-xs text-subtle">
                Stage {mandate.stage + 1} of {stages.length} &middot;{" "}
                <span className="font-medium text-ink">{stages[mandate.stage]}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default DeliveryBoard;

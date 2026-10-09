const traces = [
  'M0 92H176L226 142H420L474 88H610',
  'M0 180H118L170 232H292',
  'M0 422H156L210 368H350L406 424H540',
  'M94 560V484L148 430V310',
  'M308 0V64L352 108V196',
  'M560 0V94L616 150H732',
  'M1440 80H1240L1182 138H1062',
  'M1440 208H1312L1260 260H1164',
  'M1440 438H1240L1184 382H1002',
  'M1332 560V484L1276 428V324',
  'M994 0V66L940 120H822',
  'M846 560V490L900 436H1054',
];
const pads = [[610,88],[292,232],[540,424],[148,310],[352,196],[732,150],
  [1062,138],[1164,260],[1002,382],[1276,324],[822,120],[1054,436]];

export default function CircuitBoard() {
  return (
      <svg className="circuit-board" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g className="circuit-traces">
          {traces.map(path => <path d={path} key={path} />)}
        </g>
        <g className="circuit-packets">
          {traces.filter((_, index) => index % 2 === 0).map((path, index) => (
            <path className="circuit-packet" d={path} pathLength="100" style={{ animationDelay: `${index * -1.6}s` }} key={path} />
          ))}
        </g>
        <g className="circuit-pads">
          {pads.map(([x,y], index) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="5" />
              <circle className="circuit-pad-light" cx={x} cy={y} r="2" style={{ animationDelay: `${index * -0.7}s` }} />
            </g>
          ))}
        </g>
        <g className="circuit-chips">
          <rect x="78" y="294" width="44" height="44" rx="5" />
          <path d="M88 286V294M100 286V294M112 286V294M88 338V346M100 338V346M112 338V346M70 304H78M70 316H78M70 328H78M122 304H130M122 316H130M122 328H130" />
          <rect x="1298" y="132" width="44" height="44" rx="5" />
          <path d="M1308 124V132M1320 124V132M1332 124V132M1308 176V184M1320 176V184M1332 176V184M1290 142H1298M1290 154H1298M1290 166H1298M1342 142H1350M1342 154H1350M1342 166H1350" />
        </g>
      </svg>
  );
}

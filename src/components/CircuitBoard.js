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
  'M0 40H112L152 80H252V142',
  'M0 274H76L116 314H148',
  'M0 510H246L292 464H390',
  'M176 92V42H236',
  'M210 368V298L246 262H322',
  'M350 368V484H462L508 530H654',
  'M420 142V220H508L548 260H662',
  'M352 108H448L484 144V208',
  'M560 94H474V36H398',
  'M616 150V226L660 270H780',
  'M732 150H818V204H902',
  'M704 0V68L748 112H848',
  'M600 560V468H704L750 422H818',
  'M846 490H770V346H850',
  'M1440 28H1344L1304 68H1210',
  'M1440 302H1376V240H1312',
  'M1440 516H1378L1326 464H1188',
  'M1240 80V28H1156',
  'M1182 138V202H1080L1040 242H940',
  'M1260 260V316H1352',
  'M1184 382V462H1112L1064 510H994',
  'M1002 382H912V308H822',
  'M994 66H1094V110H1158',
  'M940 120V52H852',
  'M1054 436V326H1110',
  'M1276 428H1214V338H1144',
];
const pads = [[610,88],[292,232],[540,424],[148,310],[352,196],[732,150],
  [1062,138],[1164,260],[1002,382],[1276,324],[822,120],[1054,436],
  [252,142],[236,42],[322,262],[654,530],[662,260],[902,204],[848,112],
  [818,422],[850,346],[1210,68],[1188,464],[1156,28],[940,242],[1352,316],
  [994,510],[822,308],[1158,110],[852,52],[1110,326],[1144,338]];

export default function CircuitBoard() {
  return (
      <svg className="circuit-board" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g className="circuit-traces">
          {traces.map(path => <path d={path} key={path} />)}
        </g>
        <g className="circuit-packets">
          {traces.filter((_, index) => index % 3 !== 1).map((path, index) => (
            <path className={`circuit-packet ${index % 5 === 0 ? 'circuit-highlight' : ''}`} d={path} pathLength="100" style={{ animationDelay: `${index * -1.3}s`, animationDuration: `${8 + index % 5 * 2}s` }} key={path} />
          ))}
        </g>
        <g className="circuit-pads">
          {pads.map(([x,y], index) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="5" />
              <circle className="circuit-pad-light" cx={x} cy={y} r="2" style={{ animationDelay: `${index * -0.7}s`, animationDuration: `${4 + index % 4}s` }} />
            </g>
          ))}
        </g>
        <g className="circuit-vias">
          {[[176,92],[210,368],[420,142],[616,150],[1182,138],[1260,260],[1184,382],[940,120]].map(([x,y]) => (
            <g key={`${x}-${y}`}><circle cx={x} cy={y} r="6" /><circle cx={x} cy={y} r="2" /></g>
          ))}
        </g>
        <g className="circuit-chips">
          {[[670,310],[430,380],[1090,230]].map(([x,y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="48" height="36" rx="3" />
              {[8,18,28,38].map(offset => <path key={offset} d={`M${x+offset} ${y-7}V${y}M${x+offset} ${y+36}v7`} />)}
              <circle cx={x+8} cy={y+8} r="2" />
            </g>
          ))}
          <rect x="78" y="294" width="44" height="44" rx="5" />
          <path d="M88 286V294M100 286V294M112 286V294M88 338V346M100 338V346M112 338V346M70 304H78M70 316H78M70 328H78M122 304H130M122 316H130M122 328H130" />
          <rect x="1298" y="132" width="44" height="44" rx="5" />
          <path d="M1308 124V132M1320 124V132M1332 124V132M1308 176V184M1320 176V184M1332 176V184M1290 142H1298M1290 154H1298M1290 166H1298M1342 142H1350M1342 154H1350M1342 166H1350" />
        </g>
      </svg>
  );
}

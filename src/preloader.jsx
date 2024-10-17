const Preloader = () => {
  return (
    <div className='preloder'>
      <svg width='182px' height='182px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-ripple">
        <rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect>
        <g>
          <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="1;1;0"></animate>
          <circle cx="50" cy="50" r="40" stroke="#2c76b3" fill="none" stroke-width="4" stroke-linecap="round">
            <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="0;22;44"></animate>
          </circle>
        </g>
        <g>
          <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="1;1;0"></animate>
          <circle cx="50" cy="50" r="40" stroke="#c5c5c5" fill="none" stroke-width="4" stroke-linecap="round">
            <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="0;22;44"></animate>
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default Preloader;

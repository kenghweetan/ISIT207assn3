const WithToolTip = ({ children, toolTipText }) => {
  /*const [ToolTipPosition, setToolTipPosition] = useState({
    left: 0,
    top: 0,
    visible: false,
  });
  let mouseTimer;
     const toggleToolTip = (e) => {
    clearTimeout(mouseTimer);
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    mouseTimer = setTimeout(() => {
      setToolTipPosition({ left: x, top: y, visible: true });
    }, 300);
  };
  const resetToolTip = () => {
    clearTimeout(mouseTimer);
    setToolTipPosition({ left: 0, top: 0, visible: false });
  }; */

  return (
    <div
      className="tooltip"
      /*       onMouseOver={toggleToolTip}
            onMouseMove={(event) => {
        if (ToolTipPosition.visible) {
          resetToolTip();
        } /* else {
          toggleToolTip(event);
        } 
      }} 
      onMouseOut={resetToolTip}
      onClick={(event) => {
        resetToolTip();
      }} */
    >
      {children}
      <span
        /*         style={{
          left: ToolTipPosition.left + 10,
          top: ToolTipPosition.top - 30,
        }} */
        className={`tooltiptext ${
          /* ToolTipPosition.visible ? "visible" : */ null
        }`}
      >
        {toolTipText}
      </span>
    </div>
  );
};

export default WithToolTip;

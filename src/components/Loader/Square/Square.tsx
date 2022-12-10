function Square() {
  return (
    <div className="absolute loading-square">
      <svg viewBox="0 0 6 6" className="w-9 h-9 inline-block">
        <mask id="outline-mask">
          <rect
            x="-2" //
            y="-2"
            width="8"
            height="8"
            fill="white"
          />
          <rect
            x="1" //
            y="1"
            width="4"
            height="4"
            fill="black"
          />
        </mask>
        <rect
          x="0" //
          y="0"
          width="6"
          height="6"
          mask="url(#outline-mask)"
          className="fill-zinc-700"
        />
        <rect
          x="2" //
          y="2"
          width="2"
          height="2"
          className="fill-zinc-700"
        />
      </svg>
    </div>
  );
}

export default Square;

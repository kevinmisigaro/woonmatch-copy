import { Ref, useCallback, useEffect, useRef, useState } from "react";

const InputRangeSliderSlider = ({
  minLimit,
  maxLimit,
  inputMinVal,
  inputMaxVal,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(inputMinVal);
  const [maxVal, setMaxVal] = useState(inputMaxVal);
  const [width, setWidth] = useState(0);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const minLabelRef = useRef(null);
  const maxLabelRef = useRef(null);
  const range = useRef(null);
  const wrapper = useRef(null);
  const rangeWrapper = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - minLimit) / (maxLimit - minLimit)) * 100),
    [minLimit, maxLimit]
  );

  useEffect(() => {
    setMinVal(inputMinVal);
    setMaxVal(inputMaxVal);
  }, [inputMinVal, inputMaxVal]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal]);

  useEffect(() => {
    setTimeout(() => {
      setLabelPositions(range);
    }, 0);
  }, [range.current?.style.width, maxVal, minVal]);

  const setLabelPositions = (rangeRef: any) => {
    let _minLeft =
      rangeRef.current.offsetLeft - minLabelRef.current.offsetWidth / 2;

    let _maxLeft =
      rangeRef.current.offsetLeft +
      rangeRef.current.offsetWidth -
      maxLabelRef.current.offsetWidth / 2;

    if (_minLeft < 0) {
      _minLeft = 0;
    }

    if (
      _maxLeft + maxLabelRef.current.offsetWidth >
      rangeWrapper.current.offsetWidth
    ) {
      _maxLeft =
        rangeWrapper.current.offsetWidth - maxLabelRef.current.offsetWidth;
    }

    minLabelRef.current.style.left = `${_minLeft}px`;
    maxLabelRef.current.style.left = `${_maxLeft}px`;
  };

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        let width_percent = maxPercent - minPercent;
        if (width_percent > 100) {
          width_percent = 100;
        }

        if (width_percent < 0) {
          width_percent = 0;
        }
        range.current.style.width = `${width_percent}%`;
      }
    }
  }, [maxVal, width]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  useEffect(() => {
    setTimeout(() => {
      setWidth(wrapper.current.offsetWidth);
    }, 10);
  }, []);

  return (
    <div
      ref={wrapper}
      className="relative w-full price-slider-range-height mb-8 flex items-center justify-center">
      <input
        type="range"
        min={minLimit}
        max={maxLimit}
        value={minVal}
        ref={minValRef}
        style={{ width: width }}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={`thumb outline-none h-0 absolute z-10", ${
          minVal > maxLimit - 100 ? "z-15" : ""
        }`}
      />
      <input
        type="range"
        min={minLimit}
        max={maxLimit}
        style={{ width: width }}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb outline-none h-0 absolute z-14"
      />
      {/* 162 308 369 */}
      <div
        ref={rangeWrapper}
        className="relative price-slider-range-height w-full">
        <div
          className={` absolute price-slider-range-height w-full rounded-full first-letter:w-full z-1 bg-gray-300`}
        />
        <div
          ref={range}
          className={`rounded-full price-slider-range-height absolute z-2 bg-apple`}
        />
        <div ref={minLabelRef} className={`absolute  slider_value `}>
          &euro; {parseFloat(minVal).toLocaleString("nl-NL")}
        </div>
        <div ref={maxLabelRef} className={`absolute slider_value `}>
          &euro; {parseFloat(maxVal).toLocaleString("nl-NL")}
        </div>
      </div>
    </div>
  );
};

export default InputRangeSliderSlider;

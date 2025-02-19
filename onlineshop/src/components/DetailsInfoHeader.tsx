import { Dispatch } from 'react';

interface DetailsInfoHeaderParams {
  setDetailsInfoState: Dispatch<React.SetStateAction<number>>;
  detailsInfoState: number;
}

const DetailsInfoHeader = ({ detailsInfoState, setDetailsInfoState }: DetailsInfoHeaderParams) => {
  const detailsInfoHeaderNames = ['Desciption', 'Shipping', 'Returns'];

  const handleClick = (index: number) => {
    setDetailsInfoState(index);
  };

  return (
    <div
      className="border-b-[1px] mb-10"
      id="DetailsInfoHeader"
    >
      {detailsInfoHeaderNames.map((name, index) => (
        <button
          key={name}
          className="w-28"
          style={
            detailsInfoState === index
              ? { borderBottomWidth: '2px', borderBottomColor: 'black', fontWeight: '600' }
              : {}
          }
          onClick={() => handleClick(index)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default DetailsInfoHeader;

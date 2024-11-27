interface MapTooltipProps {
  id: number;
  pole: string;
  visible: boolean;
}

export const MapTooltip = ({ id, pole, visible }: MapTooltipProps) => {
  return (
    <div
      style={{
        display: visible ? 'block' : 'none',
        position: 'absolute',
        top: '13px',
        left: '2px',
        background: 'white',
        padding: '5px',
        borderRadius: '3px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        color: 'black',
        fontWeight: '500',
        whiteSpace: 'nowrap',
      }}
    >
      <div>ID: {id}</div>
      <div>Pole: {pole}</div>
    </div>
  );
};

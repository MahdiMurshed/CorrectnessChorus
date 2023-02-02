import { Tooltip } from '@mantine/core';

const CustomTooltip = ({ label, color, children }: any) => {
  return (
    <Tooltip label={label} color={color}>
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
        }}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export { CustomTooltip as Tooltip };

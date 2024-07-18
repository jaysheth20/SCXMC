import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingScreen(props: { fullHeight?: boolean }) {
  const { fullHeight } = props;

  return (
    <div
      style={{
        minHeight: fullHeight ? '100vh' : undefined,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
}

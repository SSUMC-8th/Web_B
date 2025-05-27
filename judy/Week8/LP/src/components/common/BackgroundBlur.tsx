interface Props {
  children: React.ReactNode;
}

export const BackgroundBlur = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen inset-0 flex items-center justify-center z-40 bg-black/50 fixed">
      {children}
    </div>
  );
};

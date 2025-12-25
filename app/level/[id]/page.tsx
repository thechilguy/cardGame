import LevelContainer from "../LevelContainer";

export default function LevelPage({ params }: { params: { id: string } }) {
  return <LevelContainer levelId={Number(params.id)} />;
}

import GlobalHeader from "../../components/Header/GlobalHeader";
import Slider from "./Slider";

export const mockItems = [
  { id: 1, title: "Card 1" },
  { id: 2, title: "Card 2" },
  { id: 3, title: "Card 3" },
  { id: 4, title: "Card 4" },
  { id: 5, title: "Card 5" },
  { id: 6, title: "Card 6" },
  { id: 7, title: "Card 7" },
  { id: 8, title: "Card 8" },
  { id: 9, title: "Card 9" },
  { id: 10, title: "Card 10" },
];

function ListPage() {
  return (
    <div>
      <GlobalHeader />
      <Slider items={mockItems} />
    </div>
  );
}
export default ListPage;

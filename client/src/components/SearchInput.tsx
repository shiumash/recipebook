import { Input } from "@/components/ui";

interface SearchInputProps {
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, handleChange }) => {
  return (
    <Input 
      type="text"
      className="text-lg mt-4" 
      placeholder="'Pasta'"
      value={searchTerm}
      onChange={handleChange}
    />
  )
}

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

function SearchBar({value,onChange}: SearchBarProps) {

    return(
        <div className=" w-2xl bg-gray-200 rounded-2xl">
        <input
          type="text"
           placeholder="Enter Valid ISBN / Name" 
           className="input w-full" 
           value={value}
           onChange={onChange}
           />
        </div>
    )

}

export default SearchBar
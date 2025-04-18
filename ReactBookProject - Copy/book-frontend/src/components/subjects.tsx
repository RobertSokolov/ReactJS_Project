import { useEffect, useRef, useState } from "react";
interface SubjectListProps {
    onSelect?: (subject: string) => void;
    defaultSubject?: string;
  }
function SubjectList({ onSelect,defaultSubject }: SubjectListProps) {
    const subjects = ["Love","Film","History","Education"];
    const [selected,setSelected] = useState<string | null>(defaultSubject || null);
    const hasSelectedOnce = useRef(false);

    useEffect(() => {
        if (defaultSubject && !hasSelectedOnce.current) {
          setSelected(defaultSubject);
          if (onSelect) onSelect(defaultSubject);
          hasSelectedOnce.current = true; 
        }
      }, [defaultSubject, onSelect]);

    const handleClick = (subject: string) => {
        setSelected(subject);
        if(onSelect) onSelect(subject);
    };
return(

    <div className="flex justify-center flex-wrap gap-2 p-4 ">
        {subjects.map((subject) => (
            <button
                key={subject}
                onClick={() => handleClick(subject)}
                className={`px-4 py-2 rounded-lg border transition ${selected === subject
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black border-gray-300 hover:bg-blue-100"
                    }`}
            >
                {subject}
            </button>
        ))}

    </div>


);

}
export default SubjectList;
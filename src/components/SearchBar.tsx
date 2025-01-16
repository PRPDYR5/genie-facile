import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";

const coursesData = {
  premiere: {
    math: {
      name: "Mathématiques Première",
      url: "https://drive.google.com/file/d/1e7pV0w9cUvz4sEzrVQuvQjpljLOEjvQE/view?usp=sharing"
    },
    physics: {
      name: "Sciences Physiques Première",
      url: "https://drive.google.com/file/d/1eAYwN6aok-KtenwNjrPh1Ys2NErswDC9/view?usp=sharing"
    },
    info: {
      name: "Informatique Première",
      url: "https://drive.google.com/file/d/1hZCyx3nuPEtc4LZAWFAnKyrAaYD2WVN7/view?usp=sharing"
    }
  },
  terminale: {
    math: {
      name: "Mathématiques Terminale",
      url: "https://drive.google.com/file/d/1rf1c14mTVBT0LiCjGEfMJ_lKsEIIO7J4/view?usp=sharing"
    },
    physics: {
      name: "Sciences Physiques Terminale",
      url: "https://drive.google.com/file/d/1wki9fTD9_ur9rhtuxgKUI3Xlwg78Wzeo/view?usp=sharing"
    },
    info: {
      name: "Informatique Terminale",
      url: "https://drive.google.com/file/d/1EN-VnNdOsOr_iDvjjd6eD-z_ZzerbpEU/view?usp=sharing"
    }
  }
};

interface SearchResult {
  name: string;
  url: string;
  level: string;
  subject: string;
}

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const getAllCourses = () => {
    const courses: SearchResult[] = [];
    Object.entries(coursesData).forEach(([level, subjects]) => {
      Object.entries(subjects).forEach(([subject, data]) => {
        courses.push({
          name: data.name,
          url: data.url,
          level,
          subject,
        });
      });
    });
    return courses;
  };

  const handleSearch = (searchTerm: string) => {
    console.log("Recherche en cours pour:", searchTerm);
    const allCourses = getAllCourses();
    
    if (!searchTerm) {
      setSearchResults(allCourses);
      return;
    }

    const filteredResults = allCourses.filter(course => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("Résultats trouvés:", filteredResults);
    setSearchResults(filteredResults);
  };

  const handleSelectCourse = (course: SearchResult) => {
    console.log("Cours sélectionné:", course);
    setOpen(false);
    
    navigate(`/courses?level=${course.level}&subject=${course.subject}&pdf=${encodeURIComponent(course.url)}`);
    
    toast({
      title: "Cours trouvé",
      description: `Redirection vers ${course.name}`,
    });
  };

  useEffect(() => {
    setSearchResults(getAllCourses());
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        onClick={() => setOpen(true)}
        className="bg-[#1A1F2C]/40 border border-[#9b87f5]/20 backdrop-blur-lg flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1A1F2C]/60 transition-all duration-200"
      >
        <Search className="w-5 h-5 text-[#9b87f5]" />
        <Input
          type="text"
          placeholder="Rechercher des cours par nom, niveau ou matière..."
          className="bg-transparent border-none focus-visible:ring-0 placeholder:text-[#9b87f5]/50 text-white"
          readOnly
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border border-[#9b87f5]/20 bg-[#1A1F2C]/95 backdrop-blur-lg">
          <CommandInput 
            placeholder="Que recherchez-vous ?" 
            onValueChange={handleSearch}
            className="border-b border-[#9b87f5]/20"
          />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Résultats de la recherche">
              {searchResults.map((course, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSelectCourse(course)}
                  className="flex items-center justify-between cursor-pointer hover:bg-[#9b87f5]/10"
                >
                  <div>
                    <span className="font-medium text-white">{course.name}</span>
                    <span className="ml-2 text-sm text-[#9b87f5]/70">
                      ({course.level})
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
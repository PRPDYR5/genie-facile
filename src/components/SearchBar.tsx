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
  seconde: {
    math: {
      name: "Mathématiques Seconde",
      url: null
    },
    physics: {
      name: "Sciences Physiques Seconde",
      url: null
    },
    info: {
      name: "Informatique Seconde",
      url: null
    },
    technologie: {
      name: "Technologie Seconde",
      url: null
    },
    electrotechnique: {
      name: "Électrotechnique Seconde",
      url: null
    },
    mesure_essai: {
      name: "Mesure Essai Seconde",
      url: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier Seconde",
      url: null
    },
    cm: {
      name: "Construction Mécanique Seconde",
      url: "https://drive.google.com/file/d/10rNCZO7UZm-lCeChCn9sHPOx-6Nlse_c/view?usp=sharing"
    },
    automatisme: {
      name: "Automatisme Seconde",
      url: null
    },
    metallurgie: {
      name: "Métallurgie Seconde",
      url: null
    }
  },
  premiere: {
    math: {
      name: "Mathématiques Première",
      url: null
    },
    physics: {
      name: "Sciences Physiques Première",
      url: null
    },
    info: {
      name: "Informatique Première",
      url: null
    },
    technologie: {
      name: "Technologie Première",
      url: null
    },
    electrotechnique: {
      name: "Électrotechnique Première",
      url: null
    },
    mesure_essai: {
      name: "Mesure Essai Première",
      url: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier Première",
      url: null
    },
    cm: {
      name: "Construction Mécanique Première",
      url: null
    },
    automatisme: {
      name: "Automatisme Première",
      url: null
    },
    metallurgie: {
      name: "Métallurgie Première",
      url: null
    }
  },
  terminale: {
    math: {
      name: "Mathématiques Terminale",
      url: null
    },
    physics: {
      name: "Sciences Physiques Terminale",
      url: "https://drive.google.com/file/d/1IjNN6ucmovo1hCUdNvQ2dE004B8oYbaS/view?usp=sharing"
    },
    info: {
      name: "Informatique Terminale",
      url: null
    },
    technologie: {
      name: "Technologie Terminale",
      url: "https://drive.google.com/file/d/1FDrYadg0eqKK09vpF0T0Jc7hjwrysYll/view?usp=sharing"
    },
    electrotechnique: {
      name: "Électrotechnique Terminale",
      url: "https://drive.google.com/file/d/1bgTwZmhl_WodNnRDr6YmjDQCCrITs0oS/view?usp=sharing"
    },
    mesure_essai: {
      name: "Mesure Essai Terminale",
      url: null
    },
    tpa: {
      name: "Travaux Pratiques Atelier Terminale",
      url: null
    },
    cm: {
      name: "Construction Mécanique Terminale",
      url: null
    },
    automatisme: {
      name: "Automatisme Terminale",
      url: "https://drive.google.com/file/d/1nO4OdXRSoyURxV11Je22wsTopMQxiV87/view?usp=sharing"
    },
    metallurgie: {
      name: "Métallurgie Terminale",
      url: "https://drive.google.com/file/d/1_gW0Cwu5GJoAa75LrcEKWxnA1V0qNCCu/view?usp=sharing"
    }
  }
};

interface SearchResult {
  name: string;
  url: string | null;
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
        className="glass flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200"
      >
        <Search className="w-5 h-5 text-[#9b87f5]" />
        <Input
          type="text"
          placeholder="Rechercher des cours par nom, niveau ou matière..."
          className="bg-transparent border-none focus-visible:ring-0 placeholder:text-[#9b87f5]/50"
          readOnly
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Que recherchez-vous ?" 
            onValueChange={handleSearch}
          />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Résultats de la recherche">
              {searchResults.map((course, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSelectCourse(course)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-medium">{course.name}</span>
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

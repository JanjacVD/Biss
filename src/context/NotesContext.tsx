import {createContext, useState} from 'react';
import {NoteInterface} from '../env/interfaces';
const NotesContext = createContext<any>(null);
export {};
function notesToArray() {
    const stored = localStorage.getItem('biss-notes');
    if (stored) {
        return JSON.parse(stored);
    } else {
        return null;
    }
}
function useNotes() {
    const [notes, setNotes] = useState<NoteInterface[] | null>(notesToArray());
    return {
        notes,
        addNote(note: string) {
            let toSet = notes;
            console.log(notes);
            if (toSet) {
                const id = toSet.length + 1;
                toSet.push({id: id, text: note});
            } else {
                toSet = [{id: 1, text: note}];
            }
            setNotes(toSet);
            localStorage.setItem('biss-notes', JSON.stringify(toSet));
        },
        editNote({id, text}: {id: number; text: string}) {
            if (notes) {
                const newArray = notes?.map((note) => {
                    if (note.id === id) {
                        return {...note, text: text};
                    }
                    return note;
                });
                console.log(text);
                setNotes(newArray);
                localStorage.setItem('biss-notes', JSON.stringify(newArray));
            }
        },
        deleteNote(id: number) {
            if (notes) {
                const newArray = notes?.filter((note) => {
                    return note.id !== id;
                });
                setNotes(newArray);
                localStorage.setItem('biss-notes', JSON.stringify(newArray));
            }
        },
    };
}
export function NotesProvider({children}: {children: React.ReactNode}) {
    const notes = useNotes();
    return (
        <NotesContext.Provider value={notes}>{children}</NotesContext.Provider>
    );
}
export default NotesContext;

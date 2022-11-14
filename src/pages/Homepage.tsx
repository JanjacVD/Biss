import NotesContext from '../context/NotesContext';
import {useContext, useState} from 'react';
import '../styles/homepage.scss';
import {NoteInterface} from '../env/interfaces';
import NoteComponent from '../components/NoteComponent';
import {defaultListItem} from '../env/constants';
export default function Homepage() {
    const {notes} = useContext(NotesContext);
    const [modal, setModal] = useState<boolean>(false);
    const [modalData, setModalData] = useState<NoteInterface | null>(null);
    const addNewModal = () => {
        setModal(true);
        setModalData(defaultListItem);
    };
    const editModal = (note: NoteInterface) => {
        setModal(true);
        setModalData(note);
    };
    if (!notes)
        return (
            <div className="main">
                <div className="addNote note" onClick={addNewModal}>
                    Add a note
                </div>
                {modal ? <Modal {...{note: modalData, setModal}} /> : null}
            </div>
        );

    return (
        <div className="main">
            <div className="addNote note" onClick={addNewModal}>
                Add a note
            </div>
            {notes.map((note: NoteInterface) => {
                return (
                    <div onClick={() => editModal(note)}>
                        <NoteComponent
                            onClick={addNewModal}
                            key={note.id}
                            note={note}
                        />
                    </div>
                );
            })}
            {modal ? <Modal {...{note: modalData, setModal}} /> : null}
        </div>
    );
}

const Modal = ({
    note,
    setModal,
}: {
    note: NoteInterface | null;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [text, setText] = useState(note?.text);
    const id = note?.id;
    const {addNote, editNote, deleteNote} = useContext(NotesContext);
    const add = () => {
        addNote(text);
        setModal(false);
    };
    const edit = () => {
        editNote({id, text});
        setModal(false);
    };
    const del = () => {
        deleteNote(id);
        setModal(false);
    };

    const toggleOff = () => {
        setModal(false);
    };
    return (
        <div className="modal">
            {id ? (
                <div className="actions">
                    <div onClick={toggleOff}>Close</div>
                    <div onClick={edit}>Edit</div>
                    <div onClick={del}>Delete</div>
                </div>
            ) : (
                <div className="actions">
                    <div onClick={toggleOff}>Close</div>
                    <div onClick={add}>Add</div>
                </div>
            )}

            <textarea
                cols={30}
                rows={10}
                value={text}
                onChange={(e) => setText(e.target.value)}></textarea>
        </div>
    );
};

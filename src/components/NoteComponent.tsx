import ReactMarkdown from 'react-markdown';
import {NoteInterface} from '../env/interfaces';

export default function NoteComponent({
    note,
}: {
    note: NoteInterface;
    onClick: () => void;
}) {
    return (
        <div className="note">
            <ReactMarkdown>{note.text}</ReactMarkdown>
        </div>
    );
}

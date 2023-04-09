import {useState, useEffect, Fragment} from 'react'

import {Dialog, Transition} from '@headlessui/react';


interface Note {
    title: string,
    text: string
}

function App() {

    const [isOpen, setIsOpen] = useState(false)
    const [notes, setNotes] = useState<Note[]>([])

    useEffect(() => {

        const n = localStorage.getItem('notes')
        if (n) {
            setNotes(JSON.parse(n))
        }

    }, []);

    const addNote = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleSubmit = () => {
        const title = document.getElementById('title') as HTMLInputElement
        const text = document.getElementById('text') as HTMLInputElement

        if (!title.value || !text.value) {
            alert('Please fill out all fields')
            return
        }

        const note = {
            title: title.value,
            text: text.value
        }
        title.value = ''
        text.value = ''
        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
        alert('Note added successfully')
        closeModal()
    }

    const deleteNote = (index: number) => {

        const confirm = window.confirm('Are you sure you want to delete this note?')
        if (confirm) {
            const updatedNotes = notes.filter((note, i) => i !== index)
            setNotes(updatedNotes)
            localStorage.setItem('notes', JSON.stringify(updatedNotes))
        }
    }


    return (
        <div className="App">

            <div className="header w-100 bg-[#25282a] h-14 px-5">

                <div className="container mx-auto h-full">
                    <div className="flex justify-between items-center h-full">
                        <span className="text-white text-xl">NoteBoard</span>
                        <span className="text-white text-lg cursor-pointer" onClick={addNote}>Add Note</span>
                    </div>
                </div>

            </div>


            {notes.length > 0 && <div className="container mx-auto mt-10 px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note, index) => (
                        <div key={index} className="bg-[#25282a] rounded-xl shadow-lg p-4">
                            <div className="flex justify-between">

                                <h3 className="text-xl font-bold text-gray-300">{note.title}</h3>
                                <span className="text-gray-500 cursor-pointer"
                                      onClick={() => deleteNote(index)}>X</span>
                            </div>
                            <p className="text-sm mt-2 text-gray-500">{note.text}</p>
                        </div>
                    ))}
                </div>
            </div>}

            {notes.length === 0 && (
                <span
                    className="absolute top-1/2 left-1/2 text-4xl text-[#25282a] -translate-x-1/2	">Not Notes</span>
            )}


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>


                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#25282a] p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-500"
                                    >
                                        Add Note
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="grid mb-6">

                                            <div>
                                                <label htmlFor="title"
                                                       className="text-sm text-gray-400">Default</label>
                                                <input type="text" id="title" placeholder="Note Title"
                                                       className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-600 text-gray-400"/>
                                            </div>
                                            <div className="mt-3">
                                                <label htmlFor="tet"
                                                       className="text-sm text-gray-400">Default</label>
                                                <textarea id="text" placeholder="Note Text"
                                                          className="mt-2 flex h-24 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-600 text-gray-400"/>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => handleSubmit()}
                                        >
                                            Add Note
                                        </button>
                                        <button type="button"
                                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>


        </div>
    )
}

export default App

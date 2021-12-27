import React, { useEffect, useRef, useState } from "react"
import { MdOutlineDelete } from "react-icons/md"
import { AiOutlineEdit } from "react-icons/ai"


const TodoApp = () => {

    const [items, setItems] = useState([]);
    const [itemEdit, setItemEdit] = useState({ 'index': null, 'item': null });
    // const [itemEditIndex, setItemEditIndex] = useState(null);
    const itemInputRef = useRef();

    useEffect(() => {
        itemInputRef.current.value = itemEdit.item;
    }, [itemEdit])

    useEffect(() => {
        const listadoLocalStorage = JSON.parse(localStorage.getItem('items-historial'));
        if (listadoLocalStorage) {
            setItems(listadoLocalStorage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items-historial', JSON.stringify(items));
    }, [items]);

    const agregarItem = () => {
        const items2 = [...items, itemInputRef.current.value];
        setItems(items2);
        itemInputRef.current.value = '';
    }

    const editarItem = () => {
        const items2 = [...items];
        items2[itemEdit.index] = itemInputRef.current.value;
        setItems(items2);
        setItemEdit({ 'index': null, 'item': null });
    }

    const eliminarItem = (index) => {
        const items2 = [...items];
        items2.splice(index, 1);
        setItems(items2);
    }


    let icon_style = { fontSize: "1.1em" };

    return (
        <>
            <div className='position-fixed top-50 start-50 translate-middle'>
                <h2 className='text-center mb-5'>TODO APP</h2>
                <table class="table">
                    <tbody>
                        {items.map((item, index) => {
                            return <>
                                <tr>
                                    <td class="fs-4 pe-5">
                                        {item}
                                    </td>
                                    <td className="ps-5">
                                        <button type="button" className="btn btn-warning ms-3" onClick={() => { setItemEdit({ 'item': item, 'index': index }) }}><AiOutlineEdit style={icon_style} /></button>
                                        <button type="button" className="btn btn-danger ms-3" onClick={() => eliminarItem(index)}><MdOutlineDelete style={icon_style} /></button>
                                    </td>
                                </tr>
                            </>
                        })}
                    </tbody>
                </table>

                <div class="input-group mb-3">
                    <input ref={itemInputRef} type="text" class="form-control" placeholder="Ingrese el item" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={itemEdit.index != null ? editarItem : agregarItem}>{itemEdit.index != null ? 'Editar' : 'Agregar'}</button>
                </div>
            </div>
        </>
    );
}

export default TodoApp;
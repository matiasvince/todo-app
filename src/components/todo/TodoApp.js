import React, { useEffect, useState } from "react"
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { Table, Button, Modal, Input } from 'antd'


const TodoApp = () => {

    const [personas, setPersonas] = useState([]);
    const [personaEdit, setPersonaEdit] = useState({ 'index': null, 'nombre': null, 'email': null, 'direccion': null });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputRef, setInputRef] = useState({ 'nombre': null, 'email': null, 'direccion': null })

    useEffect(() => {
        setInputRef({ 'nombre': personaEdit.nombre, 'email': personaEdit.email, 'direccion': personaEdit.direccion })
        if (isEditing) {
            setIsModalVisible(true);
        }
    }, [personaEdit])

    useEffect(() => {
        const listadoLocalStorage = JSON.parse(localStorage.getItem('personas-historial'));
        if (listadoLocalStorage) {
            setPersonas(listadoLocalStorage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('personas-historial', JSON.stringify(personas));
    }, [personas]);

    const agregarPersona = () => {
        const personas2 = [...personas, { 'nombre': inputRef.nombre, 'email': inputRef.email, 'direccion': inputRef.direccion }];
        setPersonas(personas2);
        setIsModalVisible(false);
        setInputRef({ 'nombre': null, 'email': null, 'direccion': null })
    }

    const editarPersona = () => {
        const personas2 = [...personas];
        personas2[personaEdit.index] = { 'nombre': inputRef.nombre, 'email': inputRef.email, 'direccion': inputRef.direccion };
        setPersonas(personas2);
        setPersonaEdit({ 'index': null, 'nombre': null, 'email': null, 'direccion': null });
        setIsEditing(false);
        setIsModalVisible(false);
    }

    const eliminarPersona = (index) => {
        Modal.confirm({
            title: 'Está seguro de eliminar esta persona?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                const personas2 = [...personas];
                personas2.splice(index, 1);
                setPersonas(personas2);
            },
            onCancel() {
            },
        });


    }

    return (
        <>
            <h2 className='text-center mt-3 mb-5'>TODO APP</h2>

            <Table
                className="ms-5 me-5"
                dataSource={personas.map((persona, index) => {
                    return { key: index, nombre: persona.nombre, email: persona.email, direccion: persona.direccion }
                })}

                columns={[
                    {
                        title: 'Nombre',
                        dataIndex: 'nombre'
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email'
                    },
                    {
                        title: 'Direccion',
                        dataIndex: 'direccion'
                    },
                    {
                        title: 'Acciones',
                        render: (record) => <>
                            <EditOutlined onClick={() => { setPersonaEdit({ 'nombre': record.nombre, 'email': record.email, 'direccion': record.direccion, 'index': record.key }); setIsEditing(true) }} />
                            <DeleteOutlined onClick={() => eliminarPersona(record.key)} style={{ color: 'red', marginLeft: 12 }} />
                        </>
                    },
                ]}
                pagination={{ pageSize: 5 }} scroll={{ y: 280 }}
            />

            <Button className="ms-5" onClick={() => setIsModalVisible(true)} type="primary">Nuevo</Button>
            <Modal title="Agregar persona" visible={isModalVisible} onCancel={() => { setIsModalVisible(false); setInputRef({ 'nombre': null, 'email': null, 'direccion': null }) }} onOk={isEditing ? editarPersona : agregarPersona}>
                <Input onChange={(val) => setInputRef(pre => {
                    return { ...pre, nombre: val.target.value }
                })} addonBefore="Nombre" placeholder="Ingrese un nombre" className="mb-3" value={inputRef.nombre} />

                <Input onChange={(val) => setInputRef(pre => {
                    return { ...pre, email: val.target.value }
                })} addonBefore="Email" placeholder="Ingrese un email" className="mb-3" value={inputRef.email} />

                <Input onChange={(val) => setInputRef(pre => {
                    return { ...pre, direccion: val.target.value }
                })} addonBefore="Direccion" placeholder="Ingrese una direccion" value={inputRef.direccion} />
            </Modal>
        </>
    );
}

export default TodoApp;
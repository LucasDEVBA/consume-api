import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

export default function Student() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [wheight, setWheight] = useState('');
  const [file, setFile] = useState('');

  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        const { data } = await axios.get(`/students/${id}`);
        const File = get(data, 'Files[0].url', '');
        setFile(File);
        setName(data.name);
        // setLastName(data.lastname);
        setEmail(data.email);
        setAge(data.age);
        setWheight(data.wheight);
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);
        const status = get(err, 'response.status', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history('/');
        }
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('O nome precisa ter entre 3 e 255 caracteres');
    }
    if (lastname.length < 3 || lastname.length > 255) {
      formErrors = true;
      toast.error('O sobrenome precisa ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (!isFloat(String(age))) {
      formErrors = true;
      toast.error('Idade precisa ser um número inteiro');
    }
    if (!isFloat(String(wheight))) {
      formErrors = true;
      toast.error('Altura inválida');
    }
    if (formErrors) return;

    try {
      if (id) {
        await axios.put(`/students/${id}`, {
          name, email, age, wheight,
        });
        toast.success('Aluno Editado com sucesso');
      } else {
        await axios.post('/students/', {
          name, lastname, email, age, wheight,
        });
        toast.success('Aluno Criado com sucesso');
        history('/');
      }
    } catch (er) {
      const status = get(er, 'response.status', '');
      const data = get(er, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };
  return (
    <Container>
      <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>

      {id && (
        <ProfilePicture>
          {file ? (
            <img crossOrigin="anonymous" src={file} alt={name} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/files/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={wheight}
          onChange={(e) => setWheight(e.target.value)}
          placeholder="Peso"
        />
        <button type="submit">{id ? 'Editar aluno' : 'Criar aluno'}</button>
      </Form>
    </Container>
  );
}

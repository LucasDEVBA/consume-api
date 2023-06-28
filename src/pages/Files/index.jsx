import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from 'lodash';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form } from './styled';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

export default function Files() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/students/${id}`);
        setPhoto(get(data, 'Files[0].url', ''));
      } catch (error) {
        toast.error('Erro ao obter imagem');
        history('/');
      }
    };
    getData();
  }, []);

  const handleChange = async (e) => {
    const newPhoto = e.target.files[0];
    const photoUrl = URL.createObjectURL(newPhoto);

    setPhoto(photoUrl);

    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('file', newPhoto);

    try {
      await axios.post('/files/', formData, {
        headers: { 'Content-Type': 'multipart/form-data/' },
      });
      toast.success('Foto enviada com sucesso');
    } catch (error) {
      const { status } = get(error, 'response', '');
      toast.error('Erro no envio da foto');

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };
  return (
    <Container>
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="photo">
          {photo ? <img crossOrigin="anonymous" src={photo} alt="" /> : 'Selecionar'}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

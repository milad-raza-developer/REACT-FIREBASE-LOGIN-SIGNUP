import React, { useState } from 'react';
import Container from '../../Components/Container';
import { Form, Input, InputNumber, Button, Upload, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { auth, createUserWithEmailAndPassword, addDoc, userRef, storage, ref, uploadBytes, getDownloadURL } from '../../Utils/firebase.js'

const Signup = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    /* eslint-disable no-template-curly-in-string */

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onFinish = (values) => {
        console.log(values);
        // console.log(values.user.email);
        // console.log(values.password);
        createUserWithEmailAndPassword(auth, values.user.email, values.password)
            .then((user) => {
                // Signed in 
                console.log('image', values.uplode[0])
                const userImage = uplodeUserImage(values.uplode[0].originFileObj)
                let userObj = {
                    uid: user.user.uid,
                    name: values.user.name,
                    email: values.user.email,
                    age: values.user.age,
                    intro: values.user.introduction,
                    userImage
                }

                console.log('Signup successufully')
                addDoc(userRef, userObj).then(() => {
                    setTimeout(()=>{
                        setSuccess('')
                    },3000);
                    setSuccess(userObj.name + ' you account has been created successfully')
                }).catch((err) => {
                    setTimeout(() => {
                        setError('')
                    }, 3000);
                    setError(err.message)
                    console.log(err)
                })

                // ...
            })
            .catch((err) => {
                setTimeout(() => {
                    setError('')
                }, 3000);
                setError(err.message)
                console.log(err)
            })
    };

    const uplodeUserImage = async (file) => {
        let userImage;
        try{
            const storageRef = ref(storage, file.name)
            const uplode = await uploadBytes(storageRef, file)
            console.log('file uploded')
            const imageUrl = await getDownloadURL(storageRef)
            userImage = imageUrl
        }
        catch(err){
            console.log(err.message)
        }
        return userImage
    }

    return (
        <Container>
            <div>
                {
                    error !== '' &&
                    <Alert message={error} type={'error'} />
                }
                {
                    success !== '' &&
                    <Alert message={success} type={'success'} />
                }
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'name']}
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'age']}
                        label="Age"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Container>
    )

};

export default Signup;
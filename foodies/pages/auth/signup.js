import Brand from '../../components/Brand'
import Back from '../../components/Back'
import { Form, Input, Select } from 'antd';
import NormalButton from '../../components/Buttons/NormalButton'
import { useRouter } from 'next/router';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 22 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
};

function signup() {

    const [form] = Form.useForm()
    const { push } = useRouter()

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
        style={{
            width: 70,
        }}
        >
        <Option value="1">+1</Option>
        <Option value="44">+44</Option>
        </Select>
    </Form.Item>
    )
    
  return (
    <div className='w-screen h-screen flex flex-col items-center'>
        <Back className='mt-[10%]'/>
        <Brand size="lg" className="opacity-90 translate-y-5"/>
        <Form
             className='w-[420px]'
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                prefix: '1',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="name"
                label="Name"
                tooltip="What do you want others to call you?"
                rules={[
                {
                    required: true,
                    message: 'Please input your name!',
                    whitespace: true,
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                {
                    required: true,
                    message: 'Please input your phone number!',
                },
                ]}
            >
                <Input
                addonBefore={prefixSelector}
                style={{
                    width: '100%',
                }}
                />
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <NormalButton className='py-2 w-1/2 flex justify-center'>
                    Register
                </NormalButton>
            </Form.Item>
        </Form>
        <div className='text-gray-600'> Already have an account? <span onClick={()=>push("/auth/signin")} className='text-sky-800 underline hover:cursor-pointer'>Sign in</span> </div>
        <div className='mt-[6%] text-gray-500/60 w-[90%] text-center'>
            Click “Regsiter” to agree to Foodies's <span className='hover:cursor-pointer underline'>Terms of Service</span> and acknowledge that Foodies's <span className='hover:cursor-pointer underline'>Privacy Policy</span> applies to you.
        </div>
    </div>
  )
}

export default signup
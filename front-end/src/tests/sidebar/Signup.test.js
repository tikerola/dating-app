import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Signup } from '../../components/Sidebar/Signup'


test('renders component', () => {

  const component = render(<Signup />)

  expect(component.container).toHaveTextContent('Sign Up')
  

})

test('handleSubmit called after submit-button push', () => {

  const signup = jest.fn()
  const setNotification = jest.fn()

  const component = render(<Signup signup={signup} setNotification={setNotification} />)

  

  const input1 = component.container.querySelector('#username')
  fireEvent.change(input1, {target: { value: 'timi' }})

  const input2 = component.getByTestId('gender-select')
  fireEvent.click(input2)

  const male = component.getByText('Male')
  fireEvent.click(male)
  
  const input3 = component.container.querySelector('#birthday')
  fireEvent.change(input3, {target: { value: '1968-04-04' }})

  const input4 = component.container.querySelector('#password')
  fireEvent.change(input4, {target: { value: '123456' }})

  const input5 = component.container.querySelector('#confirm')
  fireEvent.change(input5, {target: { value: '123456' }})

  const submit = component.getByText('Submit')
  fireEvent.click(submit)


  //component.debug()

  expect(signup.mock.calls.length).toBe(0)
})
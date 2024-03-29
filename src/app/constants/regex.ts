export const regex = {
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9-]{2,24}$/,
    password: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,16}$',
    firstName: /^(?=\S+)(?=[a-zA-Z -]*$).*(?=\S).$/,
    lastName: /^(?=\S+)(?=[a-zA-Z ]*$).*(?=\S).$/,
  };
  
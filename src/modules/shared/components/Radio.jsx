import { CheckIcon } from '@chakra-ui/icons';
import { Box, Image } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

const image =
  'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const RadioOption = ({
  value,
  title,
  caption,
  name,
  field,
  helpers,
  multi
}) => {
  const isChecked = () => {
    if (multi) {
      return field.value.includes(value);
    } else {
      return field.value === value;
    }
  };

  const handleMulti = () => {
    if (isChecked()) helpers.setValue(field.value.filter((x) => x != value));
    else helpers.setValue([...field.value, value]);
  };

  const handleSingle = () => {
    helpers.setValue(value);
  };
  const toggleChecked = () => {
    if (multi) handleMulti();
    else handleSingle();
  };
  return (
    <li>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        className="hidden peer"
        checked={() => isChecked()}
        onChange={toggleChecked}
        required
      ></input>
      <label
        htmlFor={value}
        className={`${
          isChecked() && 'border-black'
        } overflow-hidden flex flex-col border-slate-100 relative peer-checked:text-black inline-flex justify-between w-full  text-black bg-white border border-[2px] rounded-lg cursor-pointer hover:text-black hover:border-black`}
      >
        <Image
          objectFit="cover"
          minH={'160px'}
          maxH={'160px'}
          src={image}
          alt="Chakra UI"
        />

        <div className="block p-3">
          <p className={'font-semibold text-[16px] mb-1'}>{title}</p>
          <p className={'font-medium text-[12px]'}>{caption}</p>
        </div>
        {isChecked() && (
          <Box
            bg={'primary.500'}
            h={'30px'}
            w="30px"
            pos={'absolute'}
            right={'10px'}
            top={'10px'}
            className="peer-checked:block"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            rounded={'full'}
          >
            <CheckIcon color={'white'} />
          </Box>
        )}
      </label>
    </li>
  );
};

const Radio = ({ label, name, radioOptions, multi = false }) => {
  const [field, meta, helpers] = useField({ name });
  console.log(field.value);
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block mb-6 text-lg lg:text-xl border-b-[1px] pb-2 font-bold tracking-tight text-black"
      >
        {label}
      </label>
      <ul className="grid w-full gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
        {radioOptions.map((item) => (
          <RadioOption
            key={item.value}
            field={field}
            helpers={helpers}
            name={name}
            title={item.title}
            value={item.value}
            caption={item.caption}
            multi={multi}
          />
        ))}
      </ul>
    </div>
  );
};

export { Radio, RadioOption };

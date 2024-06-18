import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import LogoIcon from '../../../shared/components/LogoIcon';
import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const ElectionCard = ({
  variant,
  name,
  institution,
  end_time,
  initialTime = 3600,
  id
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [time, setTime] = useState(() => {
    const endTimeMs = new Date(end_time).getTime();
    const currentTimeMs = Date.now();
    const timeRemainingMs = Math.max(endTimeMs - currentTimeMs, 0);
    return Math.round(timeRemainingMs / 1000);
  });

  useEffect(() => {
    if (time === 0) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  //   const hours = Math.floor(time / 3600);
  //   const minutes = Math.floor((time % 3600) / 60);
  //   const seconds = time % 60;

  console.log(days, hours, minutes, seconds);

  const formatTime = (unit) =>
    unit === 0 ? '00' : unit.toString().padStart(2, '0');

  return (
    <Flex
      //   shadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.15)'}
      bg={'white'}
      p={'20px'}
      rounded={'md'}
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      <Flex justifyContent={'space-between'}>
        <Box w={'60px'}>
          <LogoIcon />
        </Box>
        <Button
          colorScheme="primary"
          variant={variant === 'result' ? 'outline' : 'solid'}
          size={'sm'}
          rounded={'full'}
          rightIcon={<ArrowForwardIcon />}
          onClick={() => navigate(`/vote/cast/${id}`)}
          loadingText="Preparing"
          isLoading={loading}
        >
          {variant === 'result' ? 'View Result' : 'Cast Vote'}
        </Button>
      </Flex>
      <Box mt={'20px'}>
        <Text fontWeight={'600'} fontSize={'20px'}>
          {name}
        </Text>
        <Flex alignItems={'center'} gap={'10px'}>
          <Text fontWeight={'500'} fontSize={'12px'} my={'2px'}>
            {institution}
          </Text>
          <Box w={'6px'} h={'6px'} bg={'gray.300'} rounded={'full'}></Box>
          <Flex alignItems={'center'} gap={'10px'}>
            <Text fontWeight={'600'} fontSize={'12px'} my={'2px'}>
              Ends in
            </Text>
            <Box fontWeight={'400'} fontSize={'12px'}>
              <span className="countdown font-mono font-bold text-[12px]">
                <span style={{ '--value': formatTime(days) }}></span>:
                <span style={{ '--value': formatTime(hours) }}></span>:
                <span style={{ '--value': formatTime(minutes) }}></span>:
                <span style={{ '--value': formatTime(seconds) }}></span>
              </span>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ElectionCard;

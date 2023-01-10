import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import Slider from 'react-slick';

import { BsBuilding, BsInfoCircle, BsBag } from 'react-icons/bs';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
};

const SmeDetails = ({ data }) => {
  return (
    <>
      <Text
        fontSize='2xl'
        fontWeight='bold'
        color="orange.400"
        borderBottom='2px'
        borderBottomColor='orange.200'
        py={1}
        mb={2}
      >
        <Icon as={BsInfoCircle} w={6} h={6} mb={2} /> Informasi
      </Text>

      <Box my={1}>
        <Flex>
          <Box width='50%'>
            <Box my={6}>
              <Text fontSize='sm'>Nama Pemilik</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.name}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>E-Mail</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.email}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>Nomor Telepon</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.phoneNumber}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>Kelompok</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.kelompok}
              </Text>
            </Box>
          </Box>
          {/* <Box width='50%'>
            <Box my={6}>
              <Text fontSize='sm'>Status Pernikahan</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.statusPernikahan}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>Kartu Keluarga</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.kartuKeluarga}
              </Text>
            </Box>
          </Box> */}
        </Flex>
      </Box>

      <Text
        fontSize='2xl'
        fontWeight='bold'
        color="orange.400"
        borderBottom='2px'
        borderBottomColor='orange.200'
        py={1}
        mt={6}
        mb={2}
      >
        <Icon as={BsBuilding} w={6} h={6} mb={2} /> Perusahaan
      </Text>

      <Box my={1}>
        <Flex>
          <Box width='50%'>
            {/* <Box my={6}>
              <Text fontSize='sm'>Badan Hukum</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.badanHukum}
              </Text>
            </Box> */}
            <Box my={6}>
              <Text fontSize='sm'>Lokasi Perusahaan</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.lokasiUsaha}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>Lama Usaha</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.lamaUsaha} tahun
              </Text>
            </Box>
            {/* <Box my={6}>
              <Text fontSize='sm'>Kepemilikan Tempat Usaha</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.kepemilikanTempatUsaha}
              </Text>
            </Box> */}
            {/* <Box my={6}>
              <Text fontSize='sm'>Jumlah Pegawai</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.jumlahPegawai}
              </Text>
            </Box> */}
            {/* <Box my={6}>
              <Text fontSize='sm'>Pendapatan Perbulan</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.pendapatanPerbulan}
              </Text>
            </Box> */}
            <Box my={6}>
              <Text fontSize='sm'>Telepon Kantor</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.teleponKantor}
              </Text>
            </Box>
            {/* <Box my={6}>
              <Text fontSize='sm'>Website Perusahaan</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.websiteUsaha}
              </Text>
            </Box> */}
            <Box my={6}>
              <Text fontSize='sm'>Channel Penjualan</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.channelPenjualan}
              </Text>
            </Box>
          </Box>
          {/* <Box width='50%'>
            <Box my={6}>
              <Text fontSize='sm'>Jumlah Pemilik</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.jumlahPemilikUsaha}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>Kepemilikan Saham</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.kepemilikanSaham}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>Kendaraan Operasional</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.kendaraanOperasional}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>Akte Perusahaan</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.aktePerusahaan}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>NIB</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.NIB}
              </Text>
            </Box>
            <Box my={6}>
              <Text fontSize='sm'>NPWP Perusahaan</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.npwpPerusahaan}
              </Text>
            </Box>
          </Box> */}
        </Flex>
      </Box>

      <Text
        fontSize='2xl'
        fontWeight='bold'
        color="orange.400"
        borderBottom='2px'
        borderBottomColor='orange.200'
        py={1}
        mt={6}
        mb={2}
      >
        <Icon as={BsBag} w={6} h={6} mb={2} /> Produk
      </Text>

      <Box my={1}>
        <Flex>
          <Box width='50%'>
            <Box my={6}>
              <Text fontSize='sm'>Produk</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.produk}
              </Text>
            </Box>
          </Box>
          {/* <Box width='50%'>
            <Box my={6}>
              <Text fontSize='sm'>Nama Produk</Text>
              <Text fontSize='sm' fontWeight='bold'>
                {data.DetailUser.namaProduk}
              </Text>
            </Box>
          </Box> */}
        </Flex>
      </Box>
    </>
  );
};

export default SmeDetails;

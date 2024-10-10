import Header from '@/components/Header';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { logEvent } from '@/utils/googleAnalytics';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import HorizontalLinearStepper from '@/components/HorizontalLinearStepper';
import { FeesStepBoards } from '@/utils/app.constant';
import { useDirection } from '../../../hooks/useDirection';

const BoardEnrollmentDetail = () => {
  const theme = useTheme<any>();
  const { t, i18n } = useTranslation();
  const { dir, isRTL } = useDirection();
  const handleBackEvent = () => {
    window.history.back();
    logEvent({
      action: 'back-button-clicked-attendance-overview',
      category: 'Board enrolment page',
      label: 'Back Button Clicked',
    });
  };
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [checked, setChecked] = React.useState([false, false]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep < 3) {
        return prevActiveStep + 1;
      } else {
        return prevActiveStep;
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep > 0) {
        return prevActiveStep - 1;
      } else {
        return prevActiveStep;
      }
    });
  };

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked([isChecked, isChecked]);
  };

  const handleChildChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedChecked = [...checked];
      updatedChecked[index] = event.target.checked;
      setChecked(updatedChecked);
    };
  return (
    <>
      <Box>
        <Header />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            color: theme.palette.warning['A200'],
            padding: '15px 20px 5px',
          }}
          width={'100%'}
        >
          <KeyboardBackspaceOutlinedIcon
            onClick={handleBackEvent}
            cursor={'pointer'}
            sx={{
              color: theme.palette.warning['A200'],
              marginTop: '18px',
              transform: isRTL ? ' rotate(180deg)' : 'unset',
            }}
          />
          <Box my={'1rem'} ml={'0.5rem'}>
            <Typography
              color={theme.palette.warning['A200']}
              textAlign={'left'}
              fontSize={'22px'}
              fontWeight={400}
            >
              Student Name {/*will come from Api */}
            </Typography>
            <Typography
              color={theme.palette.warning['A200']}
              textAlign={'left'}
              fontSize={'11px'}
              fontWeight={500}
            >
              Khapari Dharmu (Chimur, Chandrapur) {/*will come from Api */}
            </Typography>
          </Box>
        </Box>

        <Box px={'16px'}>
          <HorizontalLinearStepper activeStep={activeStep} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              border: `1px solid ${theme.palette.warning['A100']}`,
              borderRadius: '16px',
              padding: '16px',
              mt: 3,
              '@media (min-width: 900px)': {
                width: '50%',
              },
              width: '100%',
            }}
            mx={'16px'}
          >
            <Box>
              {activeStep > 0 && (
                <Box
                  sx={{
                    color: theme.palette.warning['300'],
                    fontWeight: '500',
                    fontSize: '14px',
                    mb: 1,
                  }}
                >
                  Board: NIOS {/* will come from API  */}
                </Box>
              )}

              {activeStep <= 1 && (
                <Box
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: theme.palette.warning['500'],
                  }}
                >
                  Choose which Board the Learner is going to be enrolled in
                  {/* will come from API  */}
                </Box>
              )}

              {activeStep === 0 && (
                <>
                  <Box sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        pb: '15px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: `1px solid ${theme.palette.warning['A100']}`,
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '16px',
                          fontWeight: 400,
                          color: theme.palette.warning['300'],
                        }}
                      >
                        ICSE
                      </Box>
                      <Radio
                        checked={selectedValue === 'a'}
                        onChange={handleChange}
                        value="a"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        pb: '15px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: `1px solid ${theme.palette.warning['A100']}`,
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '16px',
                          fontWeight: 400,
                          color: theme.palette.warning['300'],
                        }}
                      >
                        CBSE
                      </Box>
                      <Radio
                        checked={selectedValue === 'b'}
                        onChange={handleChange}
                        value="b"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'B' }}
                      />
                    </Box>
                  </Box>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <Box
                    sx={{
                      py: '10px',
                      borderBottom: `1px solid ${theme.palette.warning['A100']}`,
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row-reverse',
                        ml: 0,
                        mr: 0,
                        color: theme.palette.warning['300'],
                      }}
                      label={t('COMMON.SELECT_ALL')}
                      control={
                        <Checkbox
                          checked={checked.every(Boolean)}
                          indeterminate={checked[0] !== checked[1]}
                          onChange={handleParentChange}
                          sx={{
                            color: theme.palette.warning['300'],
                            '&.Mui-checked, &.MuiCheckbox-indeterminate': {
                              color: theme.palette.warning['300'],
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      py: '10px',
                      borderBottom: `1px solid ${theme.palette.warning['A100']}`,
                    }}
                  >
                    <FormControlLabel
                      label="Mathematics"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row-reverse',
                        ml: 0,
                        mr: 0,
                        color: theme.palette.warning['300'],
                      }}
                      control={
                        <Checkbox
                          checked={checked[0]}
                          onChange={handleChildChange(0)}
                          sx={{
                            color: theme.palette.warning['300'],
                            '&.Mui-checked': {
                              color: theme.palette.warning['300'],
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      py: '10px',
                      borderBottom: `1px solid ${theme.palette.warning['A100']}`,
                    }}
                  >
                    <FormControlLabel
                      label="Science"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row-reverse',
                        ml: 0,
                        mr: 0,
                        color: theme.palette.warning['300'],
                      }}
                      control={
                        <Checkbox
                          checked={checked[1]}
                          onChange={handleChildChange(1)}
                          sx={{
                            color: theme.palette.warning['300'],
                            '&.Mui-checked': {
                              color: theme.palette.warning['300'],
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                </>
              )}
            </Box>

            {activeStep === 2 && (
              <>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label={t('BOARD_ENROLMENT.BOARD_ENROLLMENT_NUMBER')}
                    variant="outlined"
                    style={{ color: theme?.palette?.warning['A200'] }}
                  />
                </Box>
              </>
            )}

            {activeStep === 3 && (
              <Box
                mt={2}
                sx={{
                  borderBottom: `1px solid ${theme.palette.warning['A100']}`,
                  pb: '10px',
                }}
              >
                <FormControl>
                  <FormLabel
                    sx={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: theme.palette.warning['200'],
                      '&.Mui-focused': {
                        color: theme.palette.warning['200'],
                      },
                    }}
                    id="demo-row-radio-buttons-group-label"
                  >
                    {t('BOARD_ENROLMENT.EXAM_FEES_PAID')}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label={t('COMMON.YES')}
                      sx={{ color: theme.palette.warning['300'] }}
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label={t('FORM.NO')}
                      sx={{ color: theme.palette.warning['300'] }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {/* Button starts form here  */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                alignItems: 'center',
                '@media (min-width: 900px)': {
                  justifyContent: 'flex-end',
                },
              }}
            >
              <Button
                sx={{
                  color: theme.palette.error.contrastText,
                  fontSize: '14px',
                  fontWeight: '500',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.palette.error.contrastText}`,
                  },
                  border: `1px solid ${theme.palette.error.contrastText}`,
                  mt: '15px',
                  width: 'fit-content',
                  px: '20px',
                }}
                className="one-line-text"
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {t('GUIDE_TOUR.PREVIOUS')}
              </Button>
              <Button
                sx={{
                  height: '40px',
                  fontSize: '14px',
                  fontWeight: '500',
                  mt: '15px',
                  width: 'fit-content',
                  px: '20px',
                }}
                className="one-line-text"
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep > 2
                  ? t('COMMON.SAVE')
                  : t('BOARD_ENROLMENT.SAVE_AND_NEXT')}
              </Button>
            </Box>
            {/* Button end here  */}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          color: theme.palette.warning['400'],
          fontWeight: 500,
          fontSize: '12px',
          marginTop: 2,
          px: '16px',
          '@media (min-width: 900px)': {
            textAlign: 'center',
          },
        }}
      >
        {activeStep > 2
          ? t('BOARD_ENROLMENT.MANDATORY', {
              FeesStepBoards: FeesStepBoards.join(', '),
            })
          : t('BOARD_ENROLMENT.TO_SAVE_YOUR_PROGRESS')}
      </Box>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default BoardEnrollmentDetail;

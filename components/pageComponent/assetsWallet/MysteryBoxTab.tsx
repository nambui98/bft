import { Box, ClickAwayListener, Stack, styled, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { ethers } from "ethers";
import { ReactNode, useEffect, useState } from "react";
import { BOX_INFO, ICON } from "../../../constants/assetsWallet";
import { useWalletContext } from "../../../contexts/WalletContext"
import { getBoxType, getOwnedBox } from "../../../libs/claim";
import { bftBox } from "../../../libs/contracts";
import { convertWalletAddress } from "../../../libs/utils/utils";
import { TEXT_STYLE } from "../../../styles/common/textStyles";

const BOX_INFOMATION = {
  silver: {
    type: 'silver',
    title: 'Silver Mystery Box',
    image: 'assets/box-silver-small.png',
    detail: {
      standard: '88%',
      rare: '11%',
      iconic: '1%'
    }
  },
  gold: {
    type: 'gold',
    title: 'Gold Mystery Box',
    image: 'assets/box-gold-small.png',
    detail: {
      standard: '50%',
      rare: '40%',
      iconic: '10%'
    }
  },
  diamond: {
    type: 'diamond',
    title: 'Diamond Mystery Box',
    image: 'assets/box-diamond-small.png',
    detail: {
      standard: '0%',
      rare: '90%',
      iconic: '10%'
    }
  }
}

export const MysteryBoxTab = () => {
  const { boxBalance, walletAccount, ethersSigner } = useWalletContext();
  const [tooltip, setTooltip] = useState<{ boxId: string }>({ boxId: '' });
  const [listBoxType, setListBoxType] = useState<any[]>();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const tooltipBody = (data: any) => {
    return <BodyTooltip>
      <TooltipItem><img src={ICON.shoeRed} /><Typography>Iconic Shoe</Typography> <Typography>{data.detail.standard}</Typography></TooltipItem>
      <TooltipItem><img src={ICON.shoeYellow} /><Typography>Rare Shoe</Typography> <Typography>{data.detail.rare}</Typography></TooltipItem>
      <TooltipItem><img src={ICON.shoeGray} /><Typography>Standard Shoe</Typography> <Typography>{data.detail.iconic}</Typography></TooltipItem>
    </BodyTooltip>
  }

  const getListBox = async () => {
    const boxContract = await new ethers.Contract(bftBox.address, bftBox.abi, ethersSigner);
    const res = await getOwnedBox(walletAccount, ethersSigner);
    const resListBoxType = await res?.map(async (item: any) => {
      const boxType = await getBoxType(item, boxContract);
      return {id: item, type: boxType};
    })
    Promise.all(resListBoxType).then(function (values) {
      const newData = values?.reduce((init, item) => {
        if (item.type === 'gold') {
          init.push({
            ...BOX_INFOMATION.gold,
            boxId: item.id
          })
        } else if(item.type === 'silver'){
          init.push({
            ...BOX_INFOMATION.silver,
            boxId: item.id
          })
        } else if(item.type === 'diamond'){
          init.push({
            ...BOX_INFOMATION.diamond,
            boxId: item.id
          })
        }

        return init
      }, [])
      setListBoxType(newData)
    });
  }


  useEffect(() => {
    getListBox()
  }, [])

  return (
    <Wrap>
      {listBoxType?.length && listBoxType?.map((item, index) => (
        <Item key={index}>
          <img src={item.image} />
          <Title>
            <Typography>{item.title}</Typography>
            <Typography>{convertWalletAddress(item.boxId, 7, 4)}</Typography>
          </Title>
          <BoxTooltip>
            {/* {!isMobile ? <ClickAwayListener onClickAway={() => setTooltip({boxId: ''})}>
              <Tooltip title={tooltipBody(item)} arrow placement="top">
                <Star></Star>
              </Tooltip>
            </ClickAwayListener> : <ClickAwayListener onClickAway={() => setTooltip({boxId: ''})}>
              <Tooltip title={tooltipBody(item)} arrow placement="top"
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => setTooltip({boxId: ''})}
                open={tooltip.boxId === `${index}` ? true : false}
                disableFocusListener
                disableHoverListener
                disableTouchListener
              >
                <Star onClick={() => setTooltip({boxId: `${index}`})}></Star>
              </Tooltip>
            </ClickAwayListener>} */}
            <Tooltip title={tooltipBody(item)} arrow placement="top">
              <Star></Star>
            </Tooltip>
          </BoxTooltip>
        </Item>
      ))}
    </Wrap>
  )
}

const Wrap = styled(Stack)({
  color: '#31373E',
  marginTop: 16,
  maxHeight: 288,
  overflow: 'auto',
  '@media (min-width: 768px)': {
    maxHeight: 465,
    minHeight: 222,
    marginTop: 0
  }
})
const Item = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: 16,
  marginBottom: 8,
  '&:last-of-type': {
    marginBottom: 0
  }
})
const Title = styled(Box)({
  marginLeft: 16,
  '& p:nth-of-type(1)': {
    ...TEXT_STYLE(16, 500),
    marginBottom: 6,
    '@media (min-width: 830px)': {
      minWidth: 172
    }
  },
  '& p:nth-of-type(2)': {
    ...TEXT_STYLE(12, 500),
    color: '#5A6178'
  }
})
const Star = styled(Box)({
  width: 32,
  height: 32,
  backgroundImage: `url(${ICON.starGray})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',

  '&:hover': {
    backgroundImage: `url(${ICON.starYellow})`,
  }
})
const BoxTooltip = styled(Box)({
  marginLeft: 'auto',
  '@media (min-width: 830px)': {
    marginLeft: 132
  }

})
const BodyTooltip = styled(Box)({

})
const TooltipItem = styled(Box)({
  marginBottom: 8,
  display: 'flex',
  alignItems: 'center',
  '&:last-of-type': {
    marginBottom: 0
  },
  '& p:first-of-type': {
    ...TEXT_STYLE(12, 500, '#ffffff')
  },
  '& p:last-of-type': {
    ...TEXT_STYLE(12, 600, '#ffffff'),
    marginLeft: 'auto',
  },
  '& img': {
    marginRight: 8
  }
})
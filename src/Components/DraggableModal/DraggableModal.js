import React, {useState} from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import './draggableModal.css'
import { Modal, Button, Image } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';

export default function DraggableModal(props) {
    const initialBounds = {
        bounds: { left: 0, top: 0, bottom: 0, right: 0 },
      };



      const [modalBounds, setModalBounds] = useState(initialBounds);

    
      const draggleRef = React.createRef();
    
      const {handleOk,handleCancel,modalVisible,setModalVisible, buySellTicketBody, buySellTicketTitle} = props
 
    
      const onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = draggleRef?.current?.getBoundingClientRect();
        setModalBounds({...bounds,
          bounds: {
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y)
          }
        });
      };
    
   
        const { bounds } = modalBounds;
        const {disabled, visible} = modalVisible;
        return (
          <>
            <Modal
              mask={false}
              maskClosable={false}
              keyboard={false}
              wrapClassName="aaa"
              width={500}
              style={{
                position: 'fixed',
                // transform: 'translateX(-50%)',
                left: (document.body.clientWidth - 500) / 2
              }}
              // zIndex={-1}
              title={
                <div
                  style={{
                    width: '100%',
                    cursor: 'move'
                  }}
                  onMouseOver={() => {
                    if (disabled) {
                        setModalVisible({...modalVisible,
                        disabled: false
                      });
                    }
                  }}
                //   onMouseOut={() => {
                //     setModalVisible({...modalVisible,
                //       disabled: true
                //     });
                //   }}
                  // fix eslintjsx-a11y/mouse-events-have-key-events
                  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                  onFocus={() => {}}
                  onBlur={() => {}}
                  // end
                >
                 
                 <div className='ticket-header'  >
                   {buySellTicketTitle()}
                      <CloseIcon onClick={()=>handleCancel()} className='close-icon'/>
                  </div>
                </div>
              }
              footer={
                null
              }
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              modalRender={modal => (
                <Draggable
                  disabled={disabled}
                  bounds={bounds}
                  onStart={(event, uiData) => onStart(event, uiData)}
                >
                  <div aa="2" ref={draggleRef}>
                    {modal}
                  </div>
                </Draggable>
              )}
            >
             {buySellTicketBody()}
            </Modal>
          </>
        );
    
}






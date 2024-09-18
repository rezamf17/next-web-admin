import { Modal } from 'antd';

function ModalDeleteMerchant(props) {
  const { visible, confirmLoading, modalText,
    setVisible, setConfirmLoading, setModalText, titleModal } = props;
    console.log('modal props',props)

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <div>
      <Modal
        title={titleModal}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <br />
        <p>Merchant Name : {props.dataDelete.merchant_name}</p>
      </Modal>
    </div>
  );
}

export default ModalDeleteMerchant
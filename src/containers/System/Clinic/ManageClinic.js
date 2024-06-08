import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGE, CommonUtils, CRUD_ACTIONS } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import TableManageClinics from './TableManageClinics';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions'
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgUrl: '',
            isSaved: false,

            isOpen: false,
            clinicEditId: '',

            action: CRUD_ACTIONS.CREATE,
        }
    }
    async componentDidMount() {
        this.props.fetchAllClinic()
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.listClinics !== this.props.listClinics) {
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                previewImgUrl: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                clinicEditId: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                imageBase64: base64,
                previewImgUrl: objectUrl,
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgUrl) {
            return
        }
        this.setState({
            isOpen: true
        })
    }
    handleEditClinicFromParent = (clinics) => {
        this.setState({
            previewImgUrl: clinics.image,
            action: CRUD_ACTIONS.EDIT,
            name: clinics.name,
            address: clinics.address,
            descriptionHTML: clinics.descriptionHTML,
            descriptionMarkdown: clinics.descriptionMarkdown,
            specialtyEditId: clinics.id,
        })
    }
    handleSaveNewClinic = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createANewClinic({
                name: this.state.name,
                address: this.state.address,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionHTML,
            })

        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAClinicRedux({
                name: this.state.name,
                address: this.state.address,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionHTML,
                id: this.state.specialtyEditId,
            })
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'address', 'descriptionHTML', 'descriptionHTML']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required parameter: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    render() {
        let { name, address, descriptionMarkdown, previewImgUrl } = this.state
        return (
            < div className='manage-clinic-container' >
                <div className='ms-title'> Quản lý cơ sở khám bệnh</div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label>Tên cơ sở khám bệnh</label>
                        <input className='form-control' type='text' value={name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh cơ sở khám bệnh</label>
                        <div className='preview-img-container'>
                            <input id="previewImg" type='file' hidden
                                onChange={(event) => this.handleOnChangeImage(event)} />
                            <label className="label-upload" htmlFor="previewImg">Tải ảnh<i className='fas fa-upload'></i></label>
                            <div className='preview-image'
                                style={{
                                    backgroundImage: `url(${previewImgUrl})`
                                }}
                                onClick={() => this.openPreviewImage()}>

                            </div>
                        </div>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type='text' value={address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12 edit-clinic'>
                        <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn-edit-clinic' : 'btn-create-clinic'}
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                'Lưu'
                                :
                                'Tạo'

                            }
                        </button>
                    </div>
                </div>

                <div className='col-12 mb-5'>
                    <TableManageClinics
                        handleEditClinicFromParentKey={this.handleEditClinicFromParent}
                        action={this.state.action}
                    />
                </div>
            </div >

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listClinics: state.admin.clinics,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editAClinicRedux: (data) => dispatch(actions.editAClinic(data)),
        createANewClinic: (data) => dispatch(actions.createANewClinic(data)),
        fetchAllClinic: () => dispatch(actions.fetchAllClinicStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

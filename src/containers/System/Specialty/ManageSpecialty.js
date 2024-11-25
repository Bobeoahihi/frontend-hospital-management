import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGE, CommonUtils, CRUD_ACTIONS } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import Lightbox from 'react-image-lightbox';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import TableManageSpecialties from './TableManageSpecialties';
import { act } from 'react-dom/test-utils';
import * as actions from '../../../store/actions'
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            previewImgUrl: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isSaved: false,
            isOpen: false,
            specialtyEditId: '',

            action: CRUD_ACTIONS.CREATE,
        }
    }
    async componentDidMount() {
        this.props.fetchAllSpecialty();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.listSpecialties !== this.props.listSpecialties) {
            this.setState({
                name: '',
                imageBase64: '',
                previewImgUrl: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                specialtyEditId: '',
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
    handleEditSpecialtyFromParent = (specialties) => {
        this.setState({
            previewImgUrl: specialties.image,
            action: CRUD_ACTIONS.EDIT,
            name: specialties.name,
            descriptionHTML: specialties.descriptionHTML,
            descriptionMarkdown: specialties.descriptionMarkdown,
            specialtyEditId: specialties.id,
        })
    }
    handleSaveNewSpecialty = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createANewSpecialty({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })

        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editASpecialtyRedux({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                id: this.state.specialtyEditId,
            })
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'descriptionHTML', 'descriptionHTML']
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
        let { name, descriptionHTML, descriptionMarkdown, previewImgUrl } = this.state
        return (
            < div className='manage-specialty-container' >
                <div className='ms-title'> Quản lý chuyên khoa</div>
                <div className='col-12 my-3 add'>Thêm/sửa chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyển khoa</label>
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
                    <div className='col-12 form-group'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn-edit-specialty' : 'btn-create-specialty'}
                            onClick={() => this.handleSaveNewSpecialty()}
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
                    <TableManageSpecialties
                        handleEditSpecialtyFromParentKey={this.handleEditSpecialtyFromParent}
                        action={this.state.action}
                    />
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listSpecialties: state.admin.specialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editASpecialtyRedux: (data) => dispatch(actions.editASpecialty(data)),
        createANewSpecialty: (data) => dispatch(actions.createANewSpecialty(data)),
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

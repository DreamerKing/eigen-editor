import { Modal, Tabs, Upload, Icon, Spin, Radio } from 'antd'
import React, { Component } from 'react'
import styles from './InsertImage.scss'
import { IconCustom } from '../../features'
import { inlineStyleCheck } from '../../index'
import Masonry from 'react-masonry-component'
const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group

const masonryOptions = {
  transitionDuration: 0
}

class InsertImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visiable: false,
      imageLinks: [
      ],
      loading: false,
      setLink: ''
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancle = this.handleCancle.bind(this)
    this.handlePostImage = this.handlePostImage.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleOk () {
    let param = {
      type: 'image',
      obj: {
        src: this.state.setLink
      }
    }
    this.props.features.insertImage(this.props.editorState, param)
    this.setState({
      visiable: false
    })
  }

  handleCancle () {
    this.setState({
      visiable: false,
      loading: false
    })
  }

  onChange (value) {
    this.setState({
      setLink: value.target.value
    })
  }

  handlePostImage (infor) {
    if (infor.file.status === 'uploading') {
      this.setState({
        loading: true
      })
    }
    if (infor.file.status == 'done') {
      let images = this.state.imageLinks
      images.push(infor.file.response.url)
      this.setState({
        imageLinks: images
      }, () => {
        if (this.state.setLink == '' && this.state.imageLinks.length) {
          this.setState({
            setLink: this.state.imageLinks[0]
          })
        } else {
          this.setState({
            setLink: this.state.imageLinks[this.state.imageLinks.length - 1]
          })
        }
      })
      this.setState({
        loading: false
      })
    }
  }

  render () {
    let { features, plateform } = this.props
    return <div>
      <Modal
        visible={this.state.visiable}
        onOk={this.handleOk}
        onCancel={this.handleCancle}
      >
        <Tabs defaultActiveKey='2'
          onTabClick={(e) => {
            if (e == 3) {
              let dispatch = features.dispatchFunc()
              dispatch({
                type: 'writingpage/switchRightTab',
                payload: '2'
              })
              dispatch({
                type: 'writingpage/getAdvise',
                payload: {
                  intent: features.model().currentIntent
                }
              })
            }
          }}
        >
          <TabPane tab='哥伦布图片库' key='1' />
          <TabPane tab='上传图片' key='2'>
            <div>
              <RadioGroup
                className={styles.SwitchPanel}
                onChange={this.onChange}
                value={this.state.setLink}>
                {
                  this.state.imageLinks.map((item, index) => {
                    return <div
                      key={index}
                      className={styles.switchSku}
                      style={{ width: '130px', height: '150px' }}
                    >
                      <Radio
                        className={styles.radioSet}
                        checked={this.state.setLink === item}
                        value={item}
                      />

                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={item}
                      />
                    </div>
                  })
                }
              </RadioGroup>
            </div>
            <div style={{ marginTop: '16px' }}>
              {
                <Spin spinning={this.state.loading}>
                  <Upload
                    multiple
                    showUploadList={false}
                    action={features.uploadImageLink()}
                    onChange={this.handlePostImage}
                  >
                    <div className={styles.uploadButton}>
                      <Icon type='plus' />
                      <div className='ant-upload-text'>Upload</div>
                    </div>
                  </Upload>
                </Spin>
              }
            </div>
          </TabPane>
          <TabPane tab='推荐图片' key='3' >
            <div>
              <RadioGroup
                className={styles.SwitchPanel}
                onChange={this.onChange}
                value={this.state.setLink}
              >
                <Masonry
                  className={styles.test} // default ''
                  elementType={'div'} // default 'div'
                  options={masonryOptions} // default {}
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad // default false and works only if disableImagesLoaded is false
                >
                  {
                    features.model().advice && features.model().advice.picture.length ? features.model().advice.picture.map((item, index) => {
                      return <div
                        key={index}
                        className={styles.switchSku}
                        style={{ width: '30%' }}
                      >
                        <Radio
                          className={styles.radioSet}
                          checked={this.state.setLink === item.origin}
                          value={item.origin}
                        />

                        <img
                          style={{ width: '100%', height: '100%' }}
                          src={item.origin}
                        />
                      </div>
                    }) : ''
                  }
                </Masonry>
              </RadioGroup>
            </div>
          </TabPane>
        </Tabs>
      </Modal>

      {
        plateform.indexOf('ADDIMG') != -1
          ? <IconCustom content='&#xe60c;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              this.setState({
                visiable: true
              })
            }}
          />
          : ''
      }
    </div>
  }
}

export default InsertImage

import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { appImages } from '../assets/images'



export default class VideoList extends Component {
    state = {
        videoUrl: '',
    }

    handleVideo = (video) => {
        this.setState({
            videoUrl: video.video_url,
        })
    }



    renderPlayButton = (videos) => {
        return (
            <TouchableOpacity
                style={{
                    right: Layout.window.width / 2 - 30,
                    top: 80,
                    position: 'absolute'
                }}
                onPress={() => this.handleVideo(videos)}>
                <Image
                    style={{
                        height: 50, width: 50,
                    }}
                    source={appImages.playButton}
                />
            </TouchableOpacity>

        )
    }

    render() {
        const { videos } = this.props;
        const { videoUrl } = this.state;
        return (
            <View>
                <View style={{ backgroundColor: Colors.white, margin: 10, }}>
                    <View style={styles.container}>
                        {this.props.renderShareButton(this.props.videos.video_url)}
                        {
                            this.props.videos.video_url === videoUrl ?
                                <VideoPlayer
                                    source={{ uri: videoUrl }}
                                    navigator={this.props.navigator}
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    onBuffer={this.onBuffer}
                                    onError={this.videoError}
                                    style={styles.videoPlayer} />
                                :
                                <View>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{ uri: this.props.videos.thumbnail_url }}
                                    />
                                    {this.renderPlayButton(videos)}
                                </View>
                        }
                    </View>
                </View>
            </View >
        )
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingBottom: 35
    },
    playButton: {
        position: 'absolute',
        right: Layout.window.width / 2 - 30,
        top: 80
    },
    thumbnail: {
        height: 200,
        width: Layout.window.width - 50,
        alignSelf: 'center'
    },
    videoPlayer: {
        height: 200,
        width: Layout.window.width - 50,
        alignSelf: 'center'
    }
});
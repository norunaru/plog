package com.plog.backend.global.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse<D> {

    private static final String DEFAULT_SUCCESS_MESSAGE_OK = "요청을 성공했습니다.";
    private static final String DEFAULT_SUCCESS_MESSAGE_CREATED = "생성 요청을 성공했습니다.";
    private static final String DEFAULT_SUCCESS_MESSAGE_UPDATE = "업데이트 요청을 성공했습니다.";
    private static final String DEFAULT_SUCCESS_MESSAGE_DELETED = "삭제 요청을 성공했습니다.";


    private int status;
    private String message;
    private D data;

    public static <D> SuccessResponse<D> ok(D data) {
        return new SuccessResponse<>(HttpStatus.OK, DEFAULT_SUCCESS_MESSAGE_OK, data);
    }

    public static SuccessResponse<?> ok() {
        return new SuccessResponse<>(HttpStatus.OK, DEFAULT_SUCCESS_MESSAGE_OK);
    }

    public static <D> SuccessResponse<D> created() {
        return new SuccessResponse<>(HttpStatus.CREATED, DEFAULT_SUCCESS_MESSAGE_CREATED);
    }

    public static <D> SuccessResponse<D> created(D data) {
        return new SuccessResponse<>(HttpStatus.CREATED, DEFAULT_SUCCESS_MESSAGE_CREATED, data);
    }

    public static SuccessResponse<?> update() {
        return new SuccessResponse<>(HttpStatus.OK, DEFAULT_SUCCESS_MESSAGE_UPDATE);
    }

    public static SuccessResponse<?> deleted() {
        return new SuccessResponse<>(HttpStatus.OK, DEFAULT_SUCCESS_MESSAGE_DELETED);
    }

    @Builder
    public SuccessResponse(HttpStatus status, String message, D data) {
        this.status = status.value();
        this.message = message;
        this.data = data;
    }

    @Builder
    public SuccessResponse(HttpStatus status, String message) {
        this.status = status.value();
        this.message = message;
    }
}

package com.plog.backend.domain.trail.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTrail is a Querydsl query type for Trail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTrail extends EntityPathBase<Trail> {

    private static final long serialVersionUID = -769682426L;

    public static final QTrail trail = new QTrail("trail");

    public final NumberPath<Double> city = createNumber("city", Double.class);

    public final NumberPath<Double> distance = createNumber("distance", Double.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Double> lake = createNumber("lake", Double.class);

    public final ArrayPath<Double[], Double> lat = createArray("lat", Double[].class);

    public final ArrayPath<Double[], Double> lon = createArray("lon", Double[].class);

    public final NumberPath<Double> mountain = createNumber("mountain", Double.class);

    public final StringPath name = createString("name");

    public final NumberPath<Double> ocean = createNumber("ocean", Double.class);

    public final NumberPath<Double> shopCnt = createNumber("shopCnt", Double.class);

    public final NumberPath<Double> toiletCnt = createNumber("toiletCnt", Double.class);

    public QTrail(String variable) {
        super(Trail.class, forVariable(variable));
    }

    public QTrail(Path<? extends Trail> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTrail(PathMetadata metadata) {
        super(Trail.class, metadata);
    }

}

